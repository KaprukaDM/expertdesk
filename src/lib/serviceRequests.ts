import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/tokens";
import { getServiceBySlug } from "@/lib/services";

export class RequestError extends Error {}

// If a proposal has sat unpicked this long, it auto-declines rather than staying open forever.
export const PROPOSAL_EXPIRY_DAYS = 30;

function isExpired(request: { status: string; proposalSentAt: Date | null }) {
  if (request.status !== "PROPOSAL_READY" || !request.proposalSentAt) return false;
  const ageMs = Date.now() - request.proposalSentAt.getTime();
  return ageMs > PROPOSAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
}

/** Days left before an unpicked proposal auto-declines, for surfacing a countdown in the UI. */
export function getProposalExpiry(request: { status: string; proposalSentAt: Date | null }) {
  if (request.status !== "PROPOSAL_READY" || !request.proposalSentAt) return null;
  const expiresAt = new Date(request.proposalSentAt.getTime() + PROPOSAL_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const daysLeft = Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000)));
  return { expiresAt, daysLeft };
}

/** Lazily declines a stale, unpicked proposal on read (no cron job in this project). */
async function applyExpiry<T extends { id: string; status: string; proposalSentAt: Date | null }>(
  request: T,
): Promise<T> {
  if (!isExpired(request)) return request;
  const updated = await prisma.serviceRequest.update({
    where: { id: request.id },
    data: { status: "DECLINED" },
  });
  return { ...request, status: updated.status };
}

export async function createServiceRequest({
  userId,
  serviceSlug,
  message,
  consentToShareAccess,
}: {
  userId: string;
  serviceSlug: string;
  message?: string;
  consentToShareAccess?: boolean;
}) {
  const service = await getServiceBySlug(serviceSlug);
  if (!service) throw new RequestError("Unknown service.");

  const existingActive = await prisma.serviceRequest.findFirst({
    where: { userId, serviceSlug: service.slug, status: { in: ["SUBMITTED", "PROPOSAL_READY"] } },
  });
  if (existingActive) {
    throw new RequestError(`You already have an active ${service.name} request.`);
  }

  const existingOrder = await prisma.order.findFirst({
    where: { userId, serviceSlug: service.slug, status: "PENDING" },
  });
  if (existingOrder) {
    throw new RequestError(
      `You already have an active ${service.name} order. Wait for it to be delivered before requesting again.`,
    );
  }

  return prisma.serviceRequest.create({
    data: {
      userId,
      serviceSlug: service.slug,
      serviceName: service.name,
      message: message?.trim() || undefined,
      consentToShareAccess: Boolean(consentToShareAccess),
    },
  });
}

/** Self-service withdraw — only while an admin hasn't started work (still SUBMITTED). Once a
 * brief/proposal exists, the customer can only pick a package or let it auto-decline. */
export async function cancelServiceRequest({ requestId, userId }: { requestId: string; userId: string }) {
  const request = await prisma.serviceRequest.findFirst({ where: { id: requestId, userId } });
  if (!request) throw new RequestError("Request not found.");
  if (request.status !== "SUBMITTED") {
    throw new RequestError("This request can no longer be withdrawn.");
  }
  return prisma.serviceRequest.update({ where: { id: request.id }, data: { status: "WITHDRAWN" } });
}

export async function getServiceRequestForUser(id: string, userId: string) {
  const request = await prisma.serviceRequest.findFirst({
    where: { id, userId },
    include: { proposals: { orderBy: { position: "asc" } }, order: true },
  });
  if (!request) return null;
  return applyExpiry(request);
}

export const listServiceRequestsForUser = cache(async (userId: string) => {
  const requests = await prisma.serviceRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { proposals: { orderBy: { position: "asc" } } },
  });
  return Promise.all(requests.map(applyExpiry));
});

export async function selectProposedPackage({
  requestId,
  userId,
  proposalId,
}: {
  requestId: string;
  userId: string;
  proposalId: string;
}) {
  const wallet = await getOrCreateWallet(userId);

  return prisma.$transaction(async (tx) => {
    const request = await tx.serviceRequest.findFirst({
      where: { id: requestId, userId },
      include: { proposals: true },
    });
    if (!request) throw new RequestError("Request not found.");
    if (isExpired(request)) {
      await tx.serviceRequest.update({ where: { id: request.id }, data: { status: "DECLINED" } });
      throw new RequestError("This proposal has expired. Please submit a new request.");
    }
    if (request.status !== "PROPOSAL_READY") {
      throw new RequestError("This request isn't ready to be picked yet.");
    }

    const proposal = request.proposals.find((p) => p.id === proposalId);
    if (!proposal) throw new RequestError("Unknown package option.");

    const freshWallet = await tx.wallet.findUniqueOrThrow({ where: { id: wallet.id } });
    if (freshWallet.balance < proposal.tokenCost) {
      throw new RequestError("Not enough tokens. Top up your wallet to continue.");
    }

    const deadlineAt = new Date(Date.now() + proposal.deliveryDays * 24 * 60 * 60 * 1000);

    const order = await tx.order.create({
      data: {
        userId,
        serviceSlug: request.serviceSlug,
        serviceName: request.serviceName,
        packageName: proposal.name,
        tokenCost: proposal.tokenCost,
        deliveryDays: proposal.deliveryDays,
        deadlineAt,
        sourceRequestId: request.id,
      },
    });

    await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: { decrement: proposal.tokenCost } },
    });

    await tx.tokenTransaction.create({
      data: {
        walletId: wallet.id,
        delta: -proposal.tokenCost,
        reason: "ORDER_PLACED",
        refId: order.id,
      },
    });

    await tx.serviceRequest.update({ where: { id: request.id }, data: { status: "CONVERTED" } });

    return order;
  });
}

// --- Admin ---

export async function listRequestsForAdmin() {
  const requests = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { include: { businessProfile: true } }, proposals: true },
  });
  return Promise.all(requests.map(applyExpiry));
}

export async function getRequestForAdmin(id: string) {
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      user: { include: { businessProfile: true } },
      proposals: { orderBy: { position: "asc" } },
      order: true,
    },
  });
  if (!request) return null;
  return applyExpiry(request);
}

export type ProposalInput = {
  name: string;
  tagline?: string;
  tokenCost: number;
  deliveryDays: number;
  features: string[];
  recommended?: boolean;
};

export async function submitProposal({
  requestId,
  briefPath,
  briefName,
  packages,
}: {
  requestId: string;
  briefPath: string;
  briefName: string;
  packages: [ProposalInput, ProposalInput, ProposalInput];
}) {
  const request = await prisma.serviceRequest.findUnique({ where: { id: requestId } });
  if (!request) throw new RequestError("Request not found.");
  if (request.status !== "SUBMITTED") {
    throw new RequestError("A proposal has already been sent for this request.");
  }

  return prisma.$transaction(async (tx) => {
    await tx.serviceRequest.update({
      where: { id: requestId },
      data: {
        status: "PROPOSAL_READY",
        briefPath,
        briefName,
        proposalSentAt: new Date(),
      },
    });

    await tx.proposedPackage.createMany({
      data: packages.map((pkg, i) => ({
        requestId,
        position: i + 1,
        name: pkg.name,
        tagline: pkg.tagline || undefined,
        tokenCost: pkg.tokenCost,
        deliveryDays: pkg.deliveryDays,
        features: pkg.features,
        recommended: pkg.recommended ?? false,
      })),
    });

    return tx.serviceRequest.findUniqueOrThrow({
      where: { id: requestId },
      include: { proposals: { orderBy: { position: "asc" } } },
    });
  });
}

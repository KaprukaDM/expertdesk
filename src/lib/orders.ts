import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/tokens";
import { getServiceBySlug } from "@/lib/services";

export class OrderError extends Error {}

export async function createOrder({
  userId,
  serviceSlug,
  packageName,
}: {
  userId: string;
  serviceSlug: string;
  packageName: "Basic" | "Standard" | "Premium";
}) {
  const service = await getServiceBySlug(serviceSlug);
  if (!service) throw new OrderError("Unknown service.");

  const tier = service.packages.find((p) => p.name === packageName);
  if (!tier) throw new OrderError("Unknown package.");

  // Ensure a wallet exists before the transaction — createWalletForUser does its own
  // write and would conflict if run inside the transaction below.
  const wallet = await getOrCreateWallet(userId);

  return prisma.$transaction(async (tx) => {
    const existingActive = await tx.order.findFirst({
      where: { userId, serviceSlug: service.slug, status: "PENDING" },
    });
    if (existingActive) {
      throw new OrderError(
        `You already have an active ${service.name} order. Wait for it to be delivered before ordering again.`,
      );
    }

    const freshWallet = await tx.wallet.findUniqueOrThrow({ where: { id: wallet.id } });
    if (freshWallet.balance < tier.tokenCost) {
      throw new OrderError("Not enough tokens. Top up your wallet to continue.");
    }

    const deadlineAt = new Date(Date.now() + tier.deliveryDays * 24 * 60 * 60 * 1000);

    const order = await tx.order.create({
      data: {
        userId,
        serviceSlug: service.slug,
        serviceName: service.name,
        packageName: tier.name,
        tokenCost: tier.tokenCost,
        deliveryDays: tier.deliveryDays,
        deadlineAt,
      },
    });

    await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: { decrement: tier.tokenCost } },
    });

    await tx.tokenTransaction.create({
      data: {
        walletId: wallet.id,
        delta: -tier.tokenCost,
        reason: "ORDER_PLACED",
        refId: order.id,
      },
    });

    return order;
  });
}

export async function getOrderForUser(orderId: string, userId: string) {
  return prisma.order.findFirst({ where: { id: orderId, userId } });
}

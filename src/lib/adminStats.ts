import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [
    ordersOpen,
    ordersDelivered,
    orderTokensAgg,
    topupTokensAgg,
    requestsNeedingProposal,
    requestsAwaitingCustomer,
    customerCount,
  ] = await Promise.all([
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.aggregate({ _sum: { tokenCost: true } }),
    prisma.tokenTransaction.aggregate({ where: { reason: "TOPUP" }, _sum: { delta: true } }),
    prisma.serviceRequest.count({ where: { status: "SUBMITTED" } }),
    prisma.serviceRequest.count({ where: { status: "PROPOSAL_READY" } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
  ]);

  return {
    ordersOpen,
    ordersDelivered,
    ordersTotal: ordersOpen + ordersDelivered,
    tokensSoldTotal: orderTokensAgg._sum.tokenCost ?? 0,
    tokensToppedUpTotal: topupTokensAgg._sum.delta ?? 0,
    requestsNeedingProposal,
    requestsAwaitingCustomer,
    customerCount,
  };
}

export async function getRecentOrders(limit = 5) {
  return prisma.order.findMany({
    include: { user: { include: { businessProfile: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/** Monthly revenue (from wallet top-ups) and order volume for the last `months` months,
 *  oldest first — the two trend charts on the dashboard. Bucketed in JS rather than a
 *  DB-side date_trunc so this works the same regardless of the underlying database engine. */
export async function getMonthlySeries(months = 6) {
  const now = new Date();
  const rangeStart = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);

  const [topups, orders] = await Promise.all([
    prisma.tokenTransaction.findMany({
      where: { reason: "TOPUP", createdAt: { gte: rangeStart } },
      select: { delta: true, createdAt: true },
    }),
    prisma.order.findMany({
      where: { createdAt: { gte: rangeStart } },
      select: { tokenCost: true, createdAt: true },
    }),
  ]);

  const buckets = Array.from({ length: months }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleDateString("en-GB", { month: "short" }),
      tokensToppedUp: 0,
      ordersCount: 0,
    };
  });
  const bucketByKey = new Map(buckets.map((b) => [b.key, b]));

  for (const t of topups) {
    const key = `${t.createdAt.getFullYear()}-${t.createdAt.getMonth()}`;
    const bucket = bucketByKey.get(key);
    if (bucket) bucket.tokensToppedUp += t.delta;
  }
  for (const o of orders) {
    const key = `${o.createdAt.getFullYear()}-${o.createdAt.getMonth()}`;
    const bucket = bucketByKey.get(key);
    if (bucket) bucket.ordersCount += 1;
  }

  return buckets;
}

export async function getRecentRequestsNeedingAction(limit = 5) {
  return prisma.serviceRequest.findMany({
    where: { status: "SUBMITTED" },
    include: { user: { include: { businessProfile: true } } },
    orderBy: { createdAt: "asc" }, // oldest-waiting first — those need action soonest
    take: limit,
  });
}

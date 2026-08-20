import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { SIGNUP_BONUS_TOKENS } from "@/lib/tokenConstants";

export { SIGNUP_BONUS_TOKENS, TOPUP_PACKAGES } from "@/lib/tokenConstants";

export async function createWalletForUser(userId: string) {
  return prisma.wallet.create({
    data: {
      userId,
      balance: SIGNUP_BONUS_TOKENS,
      transactions: {
        create: { delta: SIGNUP_BONUS_TOKENS, reason: "SIGNUP_BONUS" },
      },
    },
  });
}

export const getOrCreateWallet = cache(async (userId: string) => {
  const existing = await prisma.wallet.findUnique({ where: { userId } });
  if (existing) return existing;
  return createWalletForUser(userId);
});

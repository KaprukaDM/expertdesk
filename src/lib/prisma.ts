// Neon's serverless driver talks HTTP/WebSocket (port 443) instead of raw Postgres TCP (5432) —
// needed because this dev sandbox's network blocks outbound 5432, and it's also the standard
// choice for serverless hosts (Vercel etc.) where long-lived TCP pools don't work well anyway.
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

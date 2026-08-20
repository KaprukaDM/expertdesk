import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here — restart to pick up regenerated Prisma client (wallet/experts schema) */
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

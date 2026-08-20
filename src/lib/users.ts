import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = cache((userId: string) => prisma.user.findUnique({ where: { id: userId } }));

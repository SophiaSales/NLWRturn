import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ['query'] //log do prisma no terminal
});
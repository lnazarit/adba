import { PrismaClient } from "@prisma/client";

export const prisma = global.prisma || new PrismaClient();

if(process.env !== 'production') global.prisma = prisma
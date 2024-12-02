// Best practice for instantiating Prisma Client with Next.js
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient({
		log: ['query', 'info', 'warn', 'error'],
	});
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
// export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

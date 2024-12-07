// Best practice for instantiating Prisma Client with Next.js
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	const prismaClient = new PrismaClient({
		log: [
			{
				emit: 'event',
				level: 'query',
			},
			{
				emit: 'stdout',
				level: 'error',
			},
			{
				emit: 'stdout',
				level: 'info',
			},
			{
				emit: 'stdout',
				level: 'warn',
			},
		],
	});
	return prismaClient;
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
// export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

import { NextResponse } from 'next/server';
import { User } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function GET() {
	try {
		const users: User[] = await prisma.user.findMany();

		if (!users) {
			return NextResponse.json(
				{ error: 'Failed to load users' },
				{ status: 400 }
			);
		}

		return NextResponse.json({ data: users }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

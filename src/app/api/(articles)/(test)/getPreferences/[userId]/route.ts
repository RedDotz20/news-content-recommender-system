import { NextRequest, NextResponse } from 'next/server';
import { Articles as ArticleType } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function GET(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params;

	console.log('userID: ', userId);

	try {
		const preferences = await prisma.userPreferences.findUnique({
			where: { userId: userId },
			select: { preferences: true },
		});

		console.log(typeof preferences);

		return NextResponse.json({ data: preferences }, { status: 200 });
	} catch (error: any) {
		console.error('Error fetching preferences: ', error.message);
		return NextResponse.json(
			{ userId: userId, error: `Error fetching categories ${error.message}` },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

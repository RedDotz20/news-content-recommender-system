import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
	_req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	const { userId } = await props.params;

	try {
		const preferences = await prisma.userPreferences.findUnique({
			where: { userId: userId },
			select: { preferences: true },
		});

		return NextResponse.json({ data: preferences }, { status: 200 });
	} catch (error: any) {
		console.error('Error fetching user preferences: ', error.message);
		return NextResponse.json(
			{
				userId: userId,
				error: `Error fetching user preferences: ${error.message}`,
			},
			{ status: 500 }
		);
	}
}

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
	_req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	const { userId } = await props.params;

	try {
		const userPreference = await prisma.userPreferences.create({
			data: {
				userId: userId,
				// preferences will use the default value of []
			},
		});

		return NextResponse.json(
			{
				message: 'user preferences successfully udpated',
				data: userPreference,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.error('Error creating user preferences: ', error.message || error);

		return NextResponse.json(
			{ error: 'Error creating user preferences' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

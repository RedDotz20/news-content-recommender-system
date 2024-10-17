import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type CheckUserPrefType = { data: number | null };
type ApiResponse = CheckUserPrefType | { error: string };

export async function GET(
	req: NextRequest
): Promise<NextResponse<ApiResponse>> {
	try {
		const userId = req.nextUrl.searchParams.get('userId');

		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			);
		}

		const checkUserPreference = await prisma.userPreferences.findUnique({
			where: {
				userId: userId,
			},
			select: {
				preferences: true,
			},
		});

		// Safely handle the case where preferences are not defined or are an empty object
		const preferences = checkUserPreference?.preferences;
		const preferencesLength =
			preferences && typeof preferences === 'object'
				? Object.keys(preferences).length
				: 0;

		return NextResponse.json(
			{ data: preferencesLength > 0 ? preferencesLength : null },
			{ status: preferencesLength > 0 ? 200 : 404 }
		);
	} catch (error) {
		console.error(
			'Error fetching categories:',
			error instanceof Error ? error.message : error
		);

		return NextResponse.json(
			{ error: 'Error fetching categories' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

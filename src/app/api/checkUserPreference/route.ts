import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Handles GET requests to fetch user preferences based on user ID.
 * @param req - The request object.
 * @returns - A NextResponse object with the user's preferences length or an error message.
 */
export async function GET(req: NextRequest) {
	try {
		// Extract userId from the query parameters
		const userId = req.nextUrl.searchParams.get('userId');

		// Validate the userId parameter
		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			);
		}

		// Fetch user preferences from the database
		const userPreferenceRecord = await prisma.userPreferences.findUnique({
			where: { userId },
			select: { preferences: true },
		});

		// Extract preferences from the fetched record
		const userPreferences = userPreferenceRecord?.preferences;

		// Check if preferences exist and are in object format
		if (!userPreferences || typeof userPreferences !== 'object') {
			return NextResponse.json({ data: null }, { status: 404 });
		}

		// Get the number of preferences
		const preferencesCount = Object.keys(userPreferences).length;
		return NextResponse.json({ data: preferencesCount }, { status: 200 });
	} catch (error) {
		// Log the error and return a server error response
		console.error(
			'Error fetching user preferences:',
			error instanceof Error ? error.message : error
		);

		return NextResponse.json(
			{ error: 'Error fetching user preferences' },
			{ status: 500 }
		);
	} finally {
		// Ensure database disconnection
		await prisma.$disconnect();
	}
}

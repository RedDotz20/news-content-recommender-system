import { NextRequest, NextResponse } from 'next/server';
import { validate as uuidValidate } from 'uuid';
import { prisma } from '@/lib/db';

/**
 * Handles GET requests to fetch user preferences based on user ID.
 * @param req - The request object.
 * @returns - A NextResponse object with the user's preferences length or an error message.
 */
export async function GET(
	_req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	const { userId } = await props.params;
	try {
		// Validate the userId parameter
		if (!userId || typeof userId !== 'string' || userId.trim() === '') {
			return NextResponse.json(
				{ error: 'User ID is required and must be a non-empty string' },
				{ status: 400 }
			);
		}

		if (!uuidValidate(userId)) {
			return NextResponse.json(
				{ error: 'Invalid User ID format' },
				{ status: 400 }
			);
		}

		const checkUserExists = await prisma.userPreferences.findUnique({
			where: { userId },
		});

		if (!checkUserExists) {
			return NextResponse.json(
				{ error: 'User Preferences does not exist' },
				{ status: 404 }
			);
		}

		// Fetch user preferences from the database
		const userPreferenceRecord = await prisma.userPreferences.findUnique({
			where: { userId },
			select: { preferences: true },
		});

		if (!userPreferenceRecord) {
			return NextResponse.json(
				{ error: 'User Preferences does not exist' },
				{ status: 404 }
			);
		}

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
		const errorMessage = error instanceof Error ? error.message : error;
		console.error(
			`Error fetching user preferences for userId ${userId}: `,
			errorMessage
		);

		return NextResponse.json(
			{ error: 'Error fetching user preferences', message: errorMessage },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Handles POST requests to create user preferences.
 *
 * Creates a new user preference record with default value of empty array.
 * @param req The NextRequest object.
 * @returns A NextResponse object with a JSON payload.
 * @throws Will return a server error response if the request fails.
 */
export async function POST(
	_req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	const { userId } = await props.params;

	try {
		const userPreference = await prisma.userPreferences.create({
			data: { userId: userId }, // preferences will use the default value of []
		});

		return NextResponse.json(
			{
				message: 'user preferences successfully udpated',
				data: userPreference,
			},
			{ status: 201 }
		);
	} catch (error) {
		// Log the error and return a server error response
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error occurred';
		console.error(
			'Error creating user preferences:',
			error instanceof Error ? error.message : 'Unknown error'
		);

		return NextResponse.json(
			{ error: 'Error creating user preferences', message: errorMessage },
			{ status: 500 }
		);
	}
}

import { NextResponse } from 'next/server';

/**
 * Handles GET requests to check the health of the API.
 *
 * Returns a JSON response with a status of 'OK' and a message
 * indicating that the API is healthy if the request is successful.
 *
 * If the request fails, returns a JSON response with a status
 * of 'ERROR', a message indicating that the API is not healthy,
 * and an error message describing the failure.
 *
 * @returns {NextResponse} A JSON response indicating the health of the API.
 */
export async function GET() {
	try {
		return NextResponse.json({ status: 'OK', message: 'API is healthy' });
	} catch (error) {
		console.error('Health check failed:', error);
		let errorMessage = 'An unknown error occurred';
		if (error instanceof Error) errorMessage = error.message;
		return NextResponse.json(
			{ status: 'ERROR', message: 'API is not healthy', error: errorMessage },
			{ status: 500 }
		);
	}
}

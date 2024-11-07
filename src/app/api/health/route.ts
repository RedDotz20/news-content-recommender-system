import { NextResponse } from 'next/server';

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

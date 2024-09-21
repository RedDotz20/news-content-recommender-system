import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get('id');

	try {
		//todo: fetch articles using algorithmic recommendations
		//* ----------------------------------------------------
		return NextResponse.json({}, { status: 200 });
	} catch (error) {
		console.error('Error fetching articles:', error);
		return NextResponse.json(
			{ error: 'Error fetching articles' },
			{ status: 500 }
		);
	} finally {
		await db.$disconnect();
	}
}

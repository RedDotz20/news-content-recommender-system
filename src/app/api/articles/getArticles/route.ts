import { NextResponse } from 'next/server';
import { SampleArticles } from '@prisma/client';
import { db } from '@/lib/db';

export async function GET() {
	try {
		const articles: SampleArticles[] = await db.sampleArticles.findMany();
		return NextResponse.json({ data: articles }, { status: 200 });
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

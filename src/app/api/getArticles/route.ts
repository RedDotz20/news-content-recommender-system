import { NextResponse } from 'next/server';
import { Articles as ArticleType } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function GET() {
	try {
		const articles: ArticleType[] = await prisma.articles.findMany({
			take: 10, // Limiting to 10 records
		});
		return NextResponse.json({ data: articles }, { status: 200 });
	} catch (error) {
		console.error('Error fetching articles:', error);
		return NextResponse.json(
			{ error: 'Error fetching articles' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

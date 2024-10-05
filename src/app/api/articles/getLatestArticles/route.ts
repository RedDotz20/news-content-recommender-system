import { NextResponse } from 'next/server';
import { Articles as ArtilesType } from '@prisma/client';
import { db } from '@/lib/db';
import { fisherYatesShuffle } from '@/lib/algorithms/fisherYatesShuffle';

export async function GET() {
	try {
		const totalRecords = await db.articles.count({
			where: {
				category: 'latest',
				image_url: { not: null },
				description: { not: null },
			},
		});

		const randomOffset = Math.floor(Math.random() * (totalRecords - 100));

		const articles: ArtilesType[] = await db.$queryRaw`
      SELECT * FROM "articles"
      WHERE "image_url" IS NOT NULL
      AND "category" = 'latest'
      AND ("description" IS NOT NULL)
      OFFSET ${randomOffset} LIMIT  ;
    `;

		const shuffledArticles = fisherYatesShuffle(articles);

		return NextResponse.json({ data: shuffledArticles }, { status: 200 });
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

import { NextResponse } from 'next/server';
import { Articles as ArtilesType } from '@prisma/client';
import { db } from '@/lib/db';
import { fisherYatesShuffleArticles } from '@/lib/algorithms/fisherYatesShuffle';

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
      OFFSET ${randomOffset} LIMIT 20;
    `;

		// Shuffle select 20 from sample
		const shuffledArticles = fisherYatesShuffleArticles(articles);
		// const randomRows = articles.sort(() => 0.5 - Math.random()).slice(0, 20);

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

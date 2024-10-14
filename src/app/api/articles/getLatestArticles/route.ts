import { NextResponse } from 'next/server';
import { Articles as ArticlesType } from '@prisma/client';
import { db } from '@/lib/db';
import { fisherYatesShuffle } from '@/lib/algorithms/fisherYatesShuffle';

//TODO: Edit route based on new datasets

export async function GET() {
	try {
		// const totalRecords: number = await db.$queryRaw`
		// 	SELECT COUNT(*) FROM "articles"
		// 	WHERE "category" = 'latest'
		// 	AND "image_url" IS NOT NULL
		// 	AND ("image_url" LIKE 'https://%' OR "image_url" LIKE 'http://%')
		// 	AND "description" IS NOT NULL;
		// `;

		const totalRecords = await db.articles.count({
			where: {
				category: 'latest',
				image_url: {
					not: null,
				},
				description: { not: null },
			},
		});

		// Ensure randomOffset is non-negative and does not exceed available records
		const randomOffset = Math.max(
			0,
			Math.floor(Math.random() * (totalRecords - 100))
		);
		const limit = Math.min(100, totalRecords); // Set limit to 100, or totalRecords if less than 100

		const articles: ArticlesType[] = await db.$queryRaw`
      SELECT * FROM "articles"
      WHERE "image_url" IS NOT NULL
      AND "category" = 'latest'
      AND ("description" IS NOT NULL)
      OFFSET ${randomOffset} LIMIT ${limit};
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

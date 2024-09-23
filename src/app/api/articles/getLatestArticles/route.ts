import { NextResponse } from 'next/server';
import { LatestArticles } from '@prisma/client';
import { db } from '@/lib/db';

export async function GET() {
	try {
		const totalRecords = await db.latestArticles.count({
			where: {
				image_url: { not: null },
				category: 'latest',
				OR: [
					{ description: { not: null } },
					{ full_description: { not: null } },
				],
			},
		});

		const randomOffset = Math.floor(Math.random() * (totalRecords - 100));

		const articles: LatestArticles[] = await db.$queryRaw`
      SELECT * FROM "latest_articles"
      WHERE "image_url" IS NOT NULL
      AND "category" = 'latest'
      AND ("description" IS NOT NULL OR "full_description" IS NOT NULL)
      OFFSET ${randomOffset} LIMIT 100;
    `;

		// Randomly select 20 from  sample
		const randomRows = articles.sort(() => 0.5 - Math.random()).slice(0, 20);

		return NextResponse.json({ data: randomRows }, { status: 200 });
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

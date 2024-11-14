import { NextRequest, NextResponse } from 'next/server';
import { Articles as ArticlesType } from '@prisma/client';
import { prisma } from '@/lib/db';
import { fisherYatesShuffle } from '@/lib/algorithms/helper/fisherYatesShuffle';

/**
 * Handles GET requests to fetch a random selection of articles.
 * @param {NextRequest} req - The incoming request object containing the query parameters.
 * @returns A JSON response containing an array of articles.
 */
export async function GET(req: NextRequest) {
	try {
		const limitParam = req.nextUrl.searchParams.get('limit');
		const limit = limitParam ? parseInt(limitParam) : 0;

		// Count the total articles records
		const totalRecords = await prisma.articles.count();
		if (totalRecords <= 0) {
			return NextResponse.json({ data: [] }, { status: 200 });
		}

		// Cap the limit at totalRecords if fewer than limit
		const recordsLimit = Math.min(limit || 100, totalRecords);
		const randomOffset = Math.floor(
			Math.random() * Math.max(totalRecords - recordsLimit, 1)
		);

		const articles: ArticlesType[] = await prisma.$queryRaw`
      SELECT  *
			FROM "articles"
      WHERE "short_description" IS NOT NULL AND "authors" IS NOT NULL
      OFFSET ${randomOffset} LIMIT ${recordsLimit};
    `;

		const shuffledArticles = fisherYatesShuffle(articles);

		return NextResponse.json({ data: shuffledArticles }, { status: 200 });
	} catch (error) {
		console.error('Error fetching articles:', error);
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred.';
		return NextResponse.json(
			{ error: 'Error fetching articles', message: errorMessage },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

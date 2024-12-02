import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface CategoryResponse {
	count: number;
	category: string[];
}

interface ErrorResponse {
	error: string;
}

/**
 * Handles GET requests to fetch distinct categories.
 *
 * Returns a JSON response containing a count of the number of distinct categories and an array of the categories.
 *
 * @returns A NextResponse object with a JSON payload.
 * @throws Will return a server error response if the request fails.
 */
export async function GET(): Promise<
	NextResponse<CategoryResponse | ErrorResponse>
> {
	try {
		const uniqueCategories = await prisma.$queryRaw<
			Array<{ category: string }>
		>`SELECT DISTINCT category FROM articles;`;

		if (uniqueCategories.length > 0) {
			const categories = uniqueCategories.map((item) => item.category);
			return NextResponse.json(
				{ count: categories.length, category: categories },
				{ status: 200 }
			);
		} else {
			return NextResponse.json({ count: 0, category: [] }, { status: 200 });
		}
	} catch (error) {
		// Log the error and return a server error response
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error occurred';
		console.error(
			'Error fetching distinct categories:',
			error instanceof Error ? error.message : 'Unknown error'
		);

		return NextResponse.json(
			{ error: 'Error fetching distinct categories', message: errorMessage },
			{ status: 500 }
		);
	}
}

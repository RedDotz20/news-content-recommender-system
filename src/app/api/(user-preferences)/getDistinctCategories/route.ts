import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface CategoryResponse {
	count: number;
	category: string[];
}

interface ErrorResponse {
	error: string;
}

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
	} catch (error: unknown) {
		console.error(
			'Error fetching categories:',
			error instanceof Error ? error.message : 'Unknown error'
		);

		return NextResponse.json(
			{ error: 'Error fetching categories' } as ErrorResponse,
			{ status: 500 }
		);
	}
}

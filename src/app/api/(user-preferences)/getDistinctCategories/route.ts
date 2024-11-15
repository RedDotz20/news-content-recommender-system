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
		const uniqueCategories = await prisma.articles.findMany({
			distinct: ['category'],
			select: { category: true },
		});

		const categories = uniqueCategories.map((item) => item.category);

		return NextResponse.json(
			{ count: categories.length, category: categories },
			{ status: 200 }
		);
	} catch (error: unknown) {
		console.error(
			'Error fetching categories:',
			error instanceof Error ? error.message : 'Unknown error'
		);

		return NextResponse.json(
			{ error: 'Error fetching categories' } as ErrorResponse,
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

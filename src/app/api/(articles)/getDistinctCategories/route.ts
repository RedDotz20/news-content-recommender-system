import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface CategoryResponse {
	count: number;
	category: string[];
}

export async function GET(): Promise<NextResponse<CategoryResponse>> {
	try {
		const uniqueCategories = await prisma.articles.findMany({
			distinct: ['category'],
			select: { category: true },
		});

		return NextResponse.json(
			{
				count: uniqueCategories.length,
				category: uniqueCategories.map((item) => item.category),
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('Error fetching categories:', error.message || error);

		return NextResponse.json(
			{ error: 'Error fetching categories' } as unknown as CategoryResponse,
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
	req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	const { userId } = await props.params;
	const limitParam = req.nextUrl.searchParams.get('limit');
	const limit = limitParam ? parseInt(limitParam) : 0;

	try {
		const articles = await prisma.articles.findMany({
			include: {
				userInteractions: {
					where: { userId: userId },
					select: { id: true, isLiked: true },
				},
			},
			where: {
				link: { not: '' },
				authors: { not: null },
				headline: { not: '' },
				short_description: { not: null },
			},
			take: limit,
		});

		const articlesWithLikes = articles.map((article) => ({
			...article,
			isLiked:
				article.userInteractions.length > 0 &&
				article.userInteractions[0].isLiked,
		}));

		return NextResponse.json({ data: articlesWithLikes }, { status: 200 });
	} catch (error) {
		console.error('Error fetching articles:', error);
		return NextResponse.json(
			{ error: 'Error fetching articles' },
			{ status: 500 }
		);
	}
}

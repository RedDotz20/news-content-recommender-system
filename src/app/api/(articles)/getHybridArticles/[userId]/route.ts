import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hybridRecommendation } from '@/lib/algorithms/hybridRecommendation';
import { fisherYatesShuffle } from '@/lib/algorithms';
import { CategorialCountType, UserPreferenceType } from '@/types';

const fetchUserPreferences = async (userId: string) => {
	const currentUser = await prisma.userPreferences.findFirst({
		where: { userId },
		select: { userId: true, preferences: true },
	});

	if (!currentUser) {
		throw new Error('Current User Not Found');
	}

	const otherUsers = await prisma.userPreferences.findMany({
		where: {
			NOT: { userId },
			preferences: { not: [] },
		},
		select: { userId: true, preferences: true },
	});

	if (!otherUsers.length) {
		throw new Error('Other Users Not Found');
	}

	const parsedCurrentUser: UserPreferenceType = JSON.parse(
		JSON.stringify(currentUser)
	);

	const parsedOtherUsers: UserPreferenceType[] = JSON.parse(
		JSON.stringify(otherUsers)
	);

	return {
		currentUser: parsedCurrentUser,
		otherUsers: parsedOtherUsers,
	};
};

const fetchArticlesByCategories = async (
	recommendations: CategorialCountType[]
) => {
	const articlesPromises = recommendations.map(({ category, articles }) =>
		prisma.articles.findMany({
			where: {
				category,
				link: { not: '' },
				authors: { not: null },
				headline: { not: '' },
				short_description: { not: null },
			},
			take: articles,
		})
	);

	const articlesResults = await Promise.allSettled(articlesPromises);

	return articlesResults
		.filter(
			(result): result is PromiseFulfilledResult<any[]> =>
				result.status === 'fulfilled'
		)
		.flatMap((result) => result.value);
};

export async function GET(
	request: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await props.params;
		const baseTarget = request.nextUrl.searchParams.get('baseTarget');

		if (!baseTarget || isNaN(Number(baseTarget))) {
			return NextResponse.json(
				{ error: 'Invalid or missing BaseTarget' },
				{ status: 400 }
			);
		}

		const { currentUser, otherUsers } = await fetchUserPreferences(userId);

		const recommendations = hybridRecommendation(
			parseInt(baseTarget, 10),
			currentUser,
			otherUsers
		) as CategorialCountType[];

		const articles = await fetchArticlesByCategories(recommendations);

		const shuffledArticles = fisherYatesShuffle(articles);

		return NextResponse.json({ data: shuffledArticles }, { status: 200 });
	} catch (error) {
		console.error('Error fetching hybrid articles:', error);

		return NextResponse.json(
			{
				error: 'Failed to fetch hybrid recommended articles',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

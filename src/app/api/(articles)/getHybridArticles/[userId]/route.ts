import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hybridRecommendation } from '@/lib/algorithms/hybridRecommendation';
import { fisherYatesShuffle } from '@/lib/algorithms';
import { CategorialCountType, UserPreferenceType } from '@/types';

export async function GET(
	request: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await props.params;
		const searchparams = request.nextUrl.searchParams;
		const baseTarget = searchparams.get('baseTarget');

		if (!baseTarget || !userId) {
			const errorVar = !baseTarget ? 'BaseTarget' : 'User Id';
			return NextResponse.json(
				{ error: `${errorVar} Not Found` },
				{ status: 404 }
			);
		}

		const currentUser = await prisma.userPreferences.findFirst({
			where: { userId: userId },
			select: { userId: true, preferences: true },
		});

		if (!currentUser) {
			return NextResponse.json(
				{ error: 'Current User Not Found' },
				{ status: 404 }
			);
		}

		const otherUsers = await prisma.userPreferences.findMany({
			where: {
				NOT: { userId: userId },
				preferences: { not: [] },
			},
			select: { userId: true, preferences: true },
		});

		// const otherUsers = await prisma.userPreferences.findMany({
		// 	where: { NOT: { userId: userId } },
		// 	select: { userId: true, preferences: true },
		// });

		if (!otherUsers || otherUsers.length === 0) {
			return NextResponse.json(
				{ error: 'Other Users Not Found' },
				{ status: 404 }
			);
		}

		const parsedCurrentUser: UserPreferenceType = JSON.parse(
			JSON.stringify(currentUser)
		);

		const parsedOtherUsers: UserPreferenceType[] = JSON.parse(
			JSON.stringify(otherUsers)
		);

		const recommendedArticles = hybridRecommendation(
			parseInt(baseTarget),
			parsedCurrentUser,
			parsedOtherUsers
		) as CategorialCountType[];

		const queries: any[] = [];

		for (const { category, articles } of recommendedArticles) {
			try {
				const categoryArticles = await prisma.articles.findMany({
					where: { category },
					take: articles,
					// orderBy: { date: 'desc' }, // Optional: Adjust sorting logic
				});
				queries.push(...categoryArticles);
			} catch (error) {
				console.error(
					`Error fetching articles for category ${category}:`,
					error
				);
				// Continue to the next iteration even if one fetch fails
			}
		}

		// Combine and shuffle the results
		const allArticles = queries.flat();
		const shuffledArticles = fisherYatesShuffle(allArticles);

		return NextResponse.json({ data: shuffledArticles }, { status: 200 });
	} catch (error: any) {
		console.error('Error fetching hybrid recommended articles:', error);
		return NextResponse.json(
			{ error: 'Error fetching hybrid articles', errorMessage: error.message },
			{ status: 500 }
		);
	}
}

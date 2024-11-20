import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hybridRecommendation } from '@/lib/algorithms/hybridRecommendation';
import { fisherYatesShuffle } from '@/lib/algorithms';
import {
	CategorialCountType,
	UserPreferenceType,
	CategorialPreferenceType,
} from '@/types';

export async function GET(
	request: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await props.params;
		const baseTarget = request.nextUrl.searchParams.get('baseTarget');

		if (!userId || !baseTarget) {
			const errorVar = !userId ? 'User ID' : 'Base Target';
			return NextResponse.json(
				{ error: `${errorVar} Not Found` },
				{ status: 404 }
			);
		}

		const currentUser: UserPreferenceType = await prisma.userPreferences
			.findFirst({
				where: { userId: userId },
				select: { userId: true, preferences: true },
			})
			.then((currentUser) => JSON.parse(JSON.stringify(currentUser)))
			.catch((error) => {
				console.error('Error fetching user preferences:', error);
			});

		const otherUsers: UserPreferenceType[] = await prisma.userPreferences
			.findMany({
				where: { NOT: { userId: userId } },
				select: { userId: true, preferences: true },
			})
			.then((otherUsers) => JSON.parse(JSON.stringify(otherUsers)))
			.catch((error) => {
				console.error('Error fetching user preferences:', error);
			});

		if (currentUser && otherUsers) {
			const recommendedArticles = hybridRecommendation(
				parseInt(baseTarget),
				currentUser,
				otherUsers
			) as CategorialCountType[];

			const queries = await Promise.all(
				recommendedArticles.map(async ({ category, articles }) => {
					return prisma.articles.findMany({
						where: { category: category },
						take: articles,
						// Note: Random order cannot be directly applied; shuffle afterward if needed.
					});
				})
			);

			const results = await Promise.all(queries);
			const articles: any[] = results.flat();
			const shuffledArticles = fisherYatesShuffle(articles);

			return NextResponse.json({ articles: shuffledArticles }, { status: 200 });
		} else {
		}
	} catch (error: any) {
		console.error('Error fetching hybrid recommended articles:', error);
		return NextResponse.json(
			{
				error: 'Error fetching articles',
				erroMessage: error.message,
			},
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

// 	const currentUser = await prisma.$executeRaw`
// 		SELECT *
// 			-- jsonb_array_elements(preferences) ->> 'category' AS category,
// 			-- (jsonb_array_elements(preferences) ->> 'frequency')::INT AS frequency
// 		FROM public.user_preferences
// 		WHERE user_id = ${userId};
// `;

// const otherUsers = await prisma.$queryRaw`
//   SELECT user_id AS "userId", preferences
//   FROM public.user_preferences
//   WHERE user_id != ${userId};
// `;

// console.log('CURRENT-USER: ', currentUser);
// console.log('OTHER-USER: ', otherUsers);

// const queries = recommendedArticles.map(({ category, articles }) => {
// 	return prisma.$queryRaw`
//     SELECT *
// 		FROM articles
// 		WHERE category = ${category}
// 		ORDER BY RANDOM()
// 		LIMIT ${articles}
// 	`;
// });

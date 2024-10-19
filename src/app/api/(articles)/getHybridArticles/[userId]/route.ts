import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hybridRecommendation } from '@/lib/algorithms/hybridRecommendation';
import {
	CategorialCountType,
	UserPreferenceType,
	CategorialPreferenceType,
} from '@/types';

export async function GET(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	try {
		const { userId } = params;
		const baseTarget = req.nextUrl.searchParams.get('baseTarget');

		if (!baseTarget) {
			return NextResponse.json(
				{ error: 'Base Target is required' },
				{ status: 400 }
			);
		}

		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			);
		}

		const currentUser = await prisma.$queryRaw<CategorialPreferenceType[]>`
      SELECT
        jsonb_array_elements(preferences) ->> 'category' AS category,
        (jsonb_array_elements(preferences) ->> 'frequency')::INT AS frequency
      FROM public.user_preferences
      WHERE user_id = ${userId};
    `;

		const otherUsers = await prisma.$queryRaw<UserPreferenceType[]>`
      SELECT user_id AS "userId", preferences
      FROM public.user_preferences
      WHERE user_id != ${userId};
    `;

		const parsedCurrUser = {
			userId: userId,
			preferences: currentUser.map((row) => JSON.parse(JSON.stringify(row))),
		};

		const parsedOtherUsers = otherUsers.map(({ userId, preferences }) => ({
			userId,
			preferences,
		}));

		const recommendedArticles = hybridRecommendation(
			parseInt(baseTarget),
			parsedCurrUser,
			parsedOtherUsers
		) as CategorialCountType[];

		const queries = recommendedArticles.map(({ category, articles }) => {
			return prisma.$queryRaw`
          SELECT *
          FROM articles
          WHERE category = ${category}
          ORDER BY RANDOM()
          LIMIT ${articles}
      `;
		});

		const results = await Promise.all(queries);
		const articles = results.flat();

		return NextResponse.json(
			{ recommendedArticles: articles },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('Error fetching articles:', error);
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

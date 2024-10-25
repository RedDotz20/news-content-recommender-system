import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import {
	updateArticleFreqSchema,
	updateArticleFreqResType,
	paramsType,
} from './schema';

/**
 * Updates a user's preference for a specific category.
 *
 * Only updates one category for a given user.
 *
 * @param req The NextRequest object.
 * @returns A NextResponse object with a JSON payload.
 */
export async function PUT(
	req: NextRequest,
	{ params }: paramsType
): Promise<updateArticleFreqResType> {
	const { userId } = params;

	try {
		const body: typeof updateArticleFreqSchema = await req.json();
		const { category, frequencyVal } = updateArticleFreqSchema.parse(body);

		// Safe if the text query below is completely trusted content
		await prisma.$executeRaw`
      UPDATE public.user_preferences
      SET
        preferences = (
          SELECT jsonb_agg(
            CASE
              WHEN value ->> 'category' = ${category}
              THEN jsonb_set(value, '{frequency}', to_jsonb(${frequencyVal})::jsonb)
              ELSE value
            END
          )
          FROM jsonb_array_elements(preferences) AS value
        ),
        updated_at = now()
      WHERE user_id = ${userId}::uuid;
    `;

		return NextResponse.json(
			{
				message: 'frequency value successfully udpated',
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('Error fetching categories:', error.message || error);

		return NextResponse.json(
			{ error: 'Error fetching categories' },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

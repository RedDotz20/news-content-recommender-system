import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { updateArticleFreqSchema, updateArticleFreqResType } from './schema';

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
	props: { params: Promise<{ userId: string }> }
): Promise<updateArticleFreqResType> {
	const { userId } = await props.params;

	try {
		const body: typeof updateArticleFreqSchema = await req.json();
		const { category, frequencyVal } = updateArticleFreqSchema.parse(body);

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
	}
}

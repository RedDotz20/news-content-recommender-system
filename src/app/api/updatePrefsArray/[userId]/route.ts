import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { updatePerfsArrSchema, updatePrefsResType } from './schema';

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
): Promise<updatePrefsResType> {
	const { userId } = await props.params;

	try {
		const body = await req.json();
		const { categories } = updatePerfsArrSchema.parse(body);

		// Serialize categories to JSON
		const categoriesJson = JSON.stringify(categories);

		await prisma.$executeRaw`
    WITH new_categories AS (
      SELECT jsonb_array_elements(${categoriesJson}::jsonb) AS new_value
    )
    UPDATE public.user_preferences
    SET preferences = COALESCE(
      (
        SELECT jsonb_agg(
          CASE
            -- Increment frequency for existing categories
            WHEN existing_value ->> 'category' IN (
              SELECT new_value ->> 'category'
              FROM new_categories
            )
            THEN (
              SELECT jsonb_set(
                existing_value,
                '{frequency}',
                to_jsonb(
                  (existing_value ->> 'frequency')::int +
                  (new_value ->> 'frequency')::int
                )
              )
              FROM new_categories
              WHERE existing_value ->> 'category' = new_value ->> 'category'
            )
            ELSE existing_value
          END
        )
        FROM jsonb_array_elements(preferences) AS existing_value
      ), '[]'::jsonb  -- Fallback to an empty JSON array
    ) || COALESCE(
      (
        -- Add new categories if they don't exist
        SELECT jsonb_agg(new_value)
        FROM new_categories
        WHERE NOT EXISTS (
          SELECT 1
          FROM jsonb_array_elements(preferences) AS existing_value
          WHERE existing_value ->> 'category' = new_value ->> 'category'
        )
      ), '[]'::jsonb  -- Fallback to an empty JSON array
    ),
    updated_at = NOW()
    WHERE user_id = ${userId}::uuid;
  `;

		return NextResponse.json(
			{
				message: 'Frequency value successfully updated',
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: `Error fetching categories ${error.message}` },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { updatePerfsArrSchema } from './schema';

/**
 * Updates the user's preference categories by incrementing the frequency
 * of existing categories and adding new categories if they don't exist.
 *
 * @param request - The NextRequest object containing the request information.
 * @param props - An object containing a promise that resolves to an object
 *                with a `userId` property.
 *
 * @returns A NextResponse object with a JSON payload indicating the success
 *          or failure of the operation.
 * @throws Will return a server error response if the update operation fails.
 */
export async function PUT(
	request: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	const { userId } = await props.params;

	try {
		const body = await request.json();
		const preferences = updatePerfsArrSchema.parse(body.pref);
		const categoriesJson = JSON.stringify(preferences.categories);

		console.log(body);

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
	} catch (error) {
		console.error('Error fetching articles:', error);
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred.';
		return NextResponse.json(
			{ error: `Error fetching categories ${errorMessage}` },
			{ status: 500 }
		);
	}
}

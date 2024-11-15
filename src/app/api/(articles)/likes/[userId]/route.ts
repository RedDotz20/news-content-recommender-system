import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { updateArticleFreqSchema } from './schema';

export async function POST(
	req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await props.params;

		const body = await req.json();
		const { articleId, category, frequencyVal } =
			updateArticleFreqSchema.parse(body);

		// Use Prisma transaction to handle both operations in one go
		const transactionPostResult = await prisma.$transaction(async (prisma) => {
			// Update user_preferences JSONB data
			const preferenceUpdateResult = await prisma.$executeRaw`
				UPDATE public.user_preferences
				SET
					preferences = (
						SELECT jsonb_agg(
							CASE
								WHEN value ->> 'category' = ${category} THEN
									jsonb_set(value, '{frequency}', to_jsonb((value ->> 'frequency')::int + ${frequencyVal})::jsonb)
								ELSE
									value
							END
						)
						FROM jsonb_array_elements(preferences) AS value
					) ||
					CASE
						WHEN NOT EXISTS (
							SELECT 1
							FROM jsonb_array_elements(preferences) AS value
							WHERE value ->> 'category' = ${category}
						) THEN
							jsonb_build_array(jsonb_build_object('category', ${category}, 'frequency', ${frequencyVal}))
						ELSE
							'[]'::jsonb
					END,
					updated_at = now()
				WHERE user_id = ${userId}::uuid;
			`;

			// If preferences were updated, create interaction
			if (preferenceUpdateResult) {
				const interaction = await prisma.userInteractions.create({
					data: { userId, articleId, category },
				});
				return interaction;
			}
			return null;
		});

		if (transactionPostResult) {
			return NextResponse.json(
				{ message: 'POST: Interaction & Update Success' },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ error: 'POST: Update Failed, No preferences updated' },
				{ status: 404 }
			);
		}
	} catch (error: unknown) {
		if (typeof error === 'object' && error !== null && 'code' in error) {
			const err = error as { code?: string };
			if (err.code === 'P2003') {
				return NextResponse.json(
					{ error: `Article with ID  does not exist` },
					{ status: 404 }
				);
			}
		}
		return NextResponse.json(
			{ error: `Error liking article: ${String(error)}` },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

export async function DELETE(
	req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await props.params;

		const body = await req.json();
		const { articleId, category, frequencyVal } =
			updateArticleFreqSchema.parse(body);

		const preferenceUpdateResult = await prisma.$executeRaw`
			UPDATE public.user_preferences
			SET
				preferences = (
					SELECT jsonb_agg(value)
					FROM (
						SELECT
							CASE
								WHEN value ->> 'category' = ${category} THEN
									CASE
										WHEN (value ->> 'frequency')::int - ${frequencyVal} <= 0 THEN
											NULL  -- This will remove the category from the array
										ELSE
											jsonb_set(value, '{frequency}', to_jsonb((value ->> 'frequency')::int - ${frequencyVal})::jsonb)
									END
								ELSE
									value
							END AS value
						FROM jsonb_array_elements(preferences) AS value
					) AS subquery
					WHERE value IS NOT NULL  -- Filter out NULL values to remove deleted categories
				),
				updated_at = now()
			WHERE user_id = ${userId}::uuid;
		`;

		if (preferenceUpdateResult > 0) {
			const deletedInteraction = await prisma.userInteractions.delete({
				where: {
					userId: userId,
					articleId: articleId,
				},
			});

			if (deletedInteraction) {
				return NextResponse.json(
					{ error: 'DELETE: interaction & Delete Success' },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ error: 'DELETE: Update Failed, No interaction DELETED' },
					{ status: 404 }
				);
			}
		} else {
			return NextResponse.json(
				{ error: 'DELETE: Update Failed, No preferences updated' },
				{ status: 404 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: `Error disliking article ${error}` },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}

import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { updateArticleFreqSchema } from './schema';

/**
 * Handles a user interaction by updating the user's preference categories and
 * creating a new interaction with the given article ID and category.
 *
 * If the interaction already exists, it will update the user's preference categories
 * and update the interaction's timestamp. If the interaction does not exist, it will
 * create a new interaction with the given article ID and category.
 *
 * @param req The NextRequest object.
 * @param props An object with a `params` property containing a promise that resolves
 * to an object with a `userId` property.
 *
 * @returns A NextResponse object with a JSON payload.
 * @throws Will throw an error if the request fails or is aborted.
 */
export async function POST(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await props.params;

    const body = await req.json();
    const { articleId, category, frequencyVal } = updateArticleFreqSchema.parse(body);

    const existingInteraction = await prisma.userInteractions.findFirst({
      where: { userId: userId, articleId: articleId },
      select: { id: true }
    });

    if (existingInteraction) {
      const interactionId = existingInteraction.id;

      const updatePrefOnly = await prisma.$executeRaw`
				UPDATE public.user_preferences
				SET
					preferences = COALESCE(
						(
							SELECT jsonb_agg(
								CASE
									-- If the category matches, update its frequency
									WHEN value ->> 'category' = ${category} THEN
										jsonb_set(
											value,
											'{frequency}',
											to_jsonb((value ->> 'frequency')::int + ${frequencyVal})::jsonb
										)
									ELSE
										value
								END
							)
							FROM jsonb_array_elements(preferences) AS value
						) || -- Append new category if it does not exist
						CASE
							WHEN NOT EXISTS (
								SELECT 1
								FROM jsonb_array_elements(preferences) AS value
								WHERE value ->> 'category' = ${category}
							) THEN
								jsonb_build_array(
									jsonb_build_object('category', ${category}, 'frequency', ${frequencyVal})
								)
							ELSE
								'[]'::jsonb
						END,
						-- If preferences is empty, initialize with a new object
						jsonb_build_array(
							jsonb_build_object('category', ${category}, 'frequency', ${frequencyVal})
						)
					),
					updated_at = now()
				WHERE user_id = ${userId}::uuid;
			`;

      if (updatePrefOnly) {
        const updateTimestamp = await prisma.userInteractions.update({
          where: { id: interactionId },
          data: { updatedAt: new Date() }
        });

        if (updateTimestamp) {
          return NextResponse.json(
            {
              message: 'Interactions already exists, preferences successfully updated'
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              error: 'Interactions already exists, preferences updated, error updating timestamp'
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            error: 'Interactions already exists, error updating preferences and timestamp'
          },
          { status: 500 }
        );
      }
    } else {
      const preferenceUpdateResult = await prisma.$executeRaw`
				UPDATE public.user_preferences
				SET
					preferences =
						CASE
							-- If preferences is empty, initialize it with a new array containing the category and frequency
							WHEN preferences = '[]'::jsonb THEN
								jsonb_build_array(jsonb_build_object('category', ${category}, 'frequency', ${frequencyVal}))
							ELSE
								-- Otherwise, handle updates or appending of a new category
								COALESCE(
									(
										SELECT jsonb_agg(
											CASE
												-- If the category matches, update its frequency
												WHEN value ->> 'category' = ${category} THEN
													jsonb_set(
														value,
														'{frequency}',
														to_jsonb((value ->> 'frequency')::int + ${frequencyVal})::jsonb
													)
												ELSE
													value
											END
										)
										FROM jsonb_array_elements(preferences) AS value
									) ||
									-- Append the new category if it doesn't exist
									CASE
										WHEN NOT EXISTS (
											SELECT 1
											FROM jsonb_array_elements(preferences) AS value
											WHERE value ->> 'category' = ${category}
										) THEN
											jsonb_build_array(
												jsonb_build_object('category', ${category}, 'frequency', ${frequencyVal})
											)
										ELSE
											'[]'::jsonb
									END,
									'[]'::jsonb
								)
						END,
					updated_at = now()
				WHERE user_id = ${userId}::uuid;
			`;

      if (preferenceUpdateResult) {
        const newInteraction = await prisma.userInteractions.create({
          data: { userId, articleId, category }
        });

        if (newInteraction) {
          return NextResponse.json(
            { message: 'POST: Interaction & Pref Update Success' },
            { status: 201 }
          );
        } else {
          return NextResponse.json(
            {
              error: 'POST: Update Failed, No interaction CREATED'
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            message: 'POST: Update Failed, No preferences updated'
          },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    // Log the error and return a server error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(
      'Error liking article:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return NextResponse.json(
      { error: 'Error liking article', message: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await props.params;

    const body = await req.json();
    const { articleId, category, frequencyVal } = updateArticleFreqSchema.parse(body);

    const existingInteraction = await prisma.userInteractions.findFirst({
      where: { userId: userId, articleId: articleId },
      select: { id: true }
    });

    if (existingInteraction) {
      const interactionId = existingInteraction.id;

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

      if (preferenceUpdateResult) {
        const deletedInteraction = await prisma.userInteractions.delete({
          where: { id: interactionId }
        });

        if (deletedInteraction) {
          return NextResponse.json(
            { error: 'DELETE: Interaction & Delete Success' },
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
          { error: 'DELETE: Interaction Exists, Preference Update Failed' },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json({ error: 'DELETE: Interaction Not found' }, { status: 404 });
    }
  } catch (error) {
    // Log the error and return a server error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(
      'Error disliking article:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return NextResponse.json(
      { error: 'Error disliking article', message: errorMessage },
      { status: 500 }
    );
  }
}

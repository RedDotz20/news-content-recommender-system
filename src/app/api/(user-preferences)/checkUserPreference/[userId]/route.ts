import { NextRequest, NextResponse } from 'next/server';
import { validate as uuidValidate } from 'uuid';
import { prisma } from '@/lib/db';

/**
 * Handles GET requests to fetch user preferences based on user ID.
 * @param req - The request object.
 * @returns - A NextResponse object with the user's preferences length or an error message.
 */
export async function GET(_req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const { userId } = await props.params;

  try {
    // Validate the userId parameter
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { error: 'User ID is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!uuidValidate(userId)) {
      return NextResponse.json({ error: 'Invalid User ID format' }, { status: 400 });
    }

    const userPreferenceRecord = await prisma.userPreferences.findUnique({
      where: { userId },
      select: { preferences: true }
    });

    // Case when user preferences record is not found
    if (!userPreferenceRecord) {
      try {
        const emptyUserPrefRecord = await prisma.userPreferences.create({
          data: { userId: userId } // already with default value of []
        });

        return NextResponse.json(
          {
            data: emptyUserPrefRecord,
            message: 'User preferences successfully created with default value',
            isEmpty: true, // default value []
            isExists: true // have [] but not null
          },
          { status: 201 }
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        // Handle the error and return an appropriate response
        return NextResponse.json(
          { error: 'Failed to create user preferences', details: errorMessage },
          { status: 500 }
        );
      }
    }

    // Case when preferences are found
    const userPreferences = userPreferenceRecord.preferences;

    // Check if preferences are an empty array
    if (Array.isArray(userPreferences) && userPreferences.length === 0) {
      return NextResponse.json(
        {
          data: userPreferences,
          message: 'User preferences are empty',
          isEmpty: true, // default value []
          isExists: true // have [] but not null
        },
        { status: 200 }
      );
    }

    // Check if preferences are in object form or invalid
    if (typeof userPreferences !== 'object' || userPreferences === null) {
      return NextResponse.json(
        { error: 'No valid preferences found', isEmpty: true, isExists: true },
        { status: 404 }
      );
    }

    // Get the number of preferences
    const preferencesCount = Object.keys(userPreferences).length;

    return NextResponse.json(
      {
        data: preferencesCount,
        message: 'Preferences are loaded successfully',
        isEmpty: false,
        isExists: true
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error and return a server error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Error fetching user preferences for userId ${userId}: ${errorMessage}`);

    return NextResponse.json(
      { error: 'Error fetching user preferences', message: errorMessage },
      { status: 500 }
    );
  }
}

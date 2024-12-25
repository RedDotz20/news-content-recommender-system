import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Handles GET requests to fetch user preferences based on user ID.
 *
 * @param req The NextRequest object.
 * @param props An object containing the user ID as a string.
 * @returns A NextResponse object with a JSON payload containing the user's preferences.
 * @throws Will return a server error response if the request fails.
 */
export async function GET(_req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const { userId } = await props.params;

  try {
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: userId },
      select: { preferences: true }
    });

    return NextResponse.json({ data: preferences }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user preferences: ', error.message);
    return NextResponse.json(
      {
        userId: userId,
        error: `Error fetching user preferences: ${error.message}`
      },
      { status: 500 }
    );
  }
}

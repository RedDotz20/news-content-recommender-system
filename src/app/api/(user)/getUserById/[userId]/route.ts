import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
import { adminAuthClient } from '@/utils/supabase/adminAuthClient';

/**
 * Handles GET requests to fetch a user by their id.
 *
 * @param req The NextRequest object.
 * @param props An object with a `params` property containing a promise that resolves
 * to an object with a `userId` property.
 *
 * @returns A NextResponse object with a JSON payload containing the user data.
 * @throws Will throw an error if the request fails or is aborted.
 */
export async function GET(_req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await props.params;
    const { data, error } = await adminAuthClient.getUserById(userId);

    if (error) {
      console.error('Error FETCHING user id:', error);
      return NextResponse.json({ error: 'Error FETCHING user id' }, { status: 500 });
    }
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error: any) {
    console.error('Unexpected error fetching user id:', error);
    return NextResponse.json({ error: 'Unexpected error fetching user id' }, { status: 500 });
  }
}

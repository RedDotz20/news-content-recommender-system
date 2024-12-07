import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/utils/supabase/adminAuthClient';

/**
 * Handles GET requests to retrieve a list of all users.
 *
 * Utilizes the adminAuthClient to fetch user data.
 * If an error occurs during the fetching process, logs the error and returns a 500 error response.
 * On success, returns a JSON response with the list of users and a 200 status code.
 *
 * @returns {Promise<NextResponse>} A NextResponse object containing the list of users or an error message.
 */
export async function GET() {
  try {
    const { data, error } = await adminAuthClient.listUsers();

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }

    return NextResponse.json({ data: data.users }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error fetching users:', error);
    return NextResponse.json({ error: 'Unexpected error fetching users' }, { status: 500 });
  }
}

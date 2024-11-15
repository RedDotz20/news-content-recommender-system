import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/utils/supabase/adminAuthClient';

export async function GET() {
	try {
		const { data, error } = await adminAuthClient.listUsers();

		if (error) {
			console.error('Error fetching users:', error);
			return NextResponse.json(
				{ error: 'Error fetching users' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ data: data.users }, { status: 200 });
	} catch (error) {
		console.error('Unexpected error fetching users:', error);
		return NextResponse.json(
			{ error: 'Unexpected error fetching users' },
			{ status: 500 }
		);
	}
}

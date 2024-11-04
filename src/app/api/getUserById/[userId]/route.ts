import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { adminAuthClient } from '@/utils/supabase/adminAuthClient';

export async function GET(
	_req: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await props.params;
		const { data, error } = await adminAuthClient.getUserById(userId);

		if (error) {
			console.error('Error fetching user id:', error);
			return NextResponse.json(
				{ error: 'Error fetching user id' },
				{ status: 500 }
			);
		}
		return NextResponse.json({ user: data.user }, { status: 200 });
	} catch (error: any) {
		console.error('Unexpected error fetching user id:', error);
		return NextResponse.json(
			{ error: 'Unexpected error fetching user id' },
			{ status: 500 }
		);
	}
}

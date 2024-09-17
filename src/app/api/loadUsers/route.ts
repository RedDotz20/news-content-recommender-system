import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
	const users = await db.user.findMany();

	if (!users) {
		return NextResponse.json(
			{ error: 'Failed to load users' },
			{ status: 400 }
		);
	}

	return NextResponse.json({ success: users }, { status: 200 });
}

import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		return NextResponse.json({ success: session.user }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 }
		);
	}
}

import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
	request: NextRequest,
	props: { params: Promise<{ userId: string }> }
) {
	const { userId } = await props.params;
	const searchParams = request.nextUrl.searchParams;
	const baseTarget = searchParams.get('baseTarget');

	return NextResponse.json({
		userId: userId,
		message: `Searching for Base Target ${baseTarget}`,
	});
}

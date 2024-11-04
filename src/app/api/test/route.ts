import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({ response: 'Test Route' }, { status: 200 });
}

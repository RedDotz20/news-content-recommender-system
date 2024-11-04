// lib/rateLimiter.ts
import { NextRequest, NextResponse } from 'next/server';
import { ipAddress } from '@vercel/functions';
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimiterMiddleware(req: NextRequest) {
	const ip =
		req.headers.get('x-forwarded-for') ||
		ipAddress(req) ||
		req.headers.get('x-real-ip');
	const limit = 25; // Limit requests to 5 per minute per IP
	const windowMs = 60 * 1000; // 1 minute

	if (!ip) {
		return NextResponse.json(
			{ message: 'Unable to determine IP address' },
			{ status: 400 }
		);
	}

	if (!rateLimitMap.has(ip)) {
		rateLimitMap.set(ip, {
			count: 0,
			lastReset: Date.now(),
		});
	}

	const ipData = rateLimitMap.get(ip)!;

	// Reset count if the time window has passed
	if (Date.now() - ipData.lastReset > windowMs) {
		ipData.count = 0;
		ipData.lastReset = Date.now();
	}

	if (ipData.count >= limit) {
		return NextResponse.json({ message: 'Too Many Requests' }, { status: 429 });
	}

	ipData.count += 1;

	// Return null if the request can proceed
	return null;
}

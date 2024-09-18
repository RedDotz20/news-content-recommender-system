import { NextRequest, NextResponse } from 'next/server';
import NextAuthMiddleware, { NextRequestWithAuth } from 'next-auth/middleware';

export const API_SECRET_KEY = process.env.API_SECRET_KEY;

export function middleware(request: NextRequestWithAuth) {
	// Handle authentication routes
	if (request.nextUrl.pathname.startsWith('/home')) {
		return NextAuthMiddleware(request);
	}

	// Handle API protection
	if (request.nextUrl.pathname.startsWith('/api')) {
		const secretKey = request.headers.get('x-api-secret-key');

		if (secretKey !== API_SECRET_KEY) {
			return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
		}
	}

	// Continue to the next middleware or request handler
	return NextResponse.next();
}

export const config = {
	matcher: ['/home(.*)', '/api/:path*'],
};

// export { default } from 'next-auth/middleware';
// export const config = { matcher: ['/home(.*)'] };

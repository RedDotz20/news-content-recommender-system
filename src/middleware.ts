import { NextRequest, NextResponse } from 'next/server';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export const API_SECRET_KEY = process.env.API_SECRET_KEY;

const secureApiMiddleware = async (request: NextRequest) => {
	const routePath = request.nextUrl.pathname;

	// Exclude Authentication Routes (for nextauth)
	if (routePath.startsWith('/api/auth')) {
		return NextResponse.next();
	}

	if (routePath.startsWith('/api')) {
		const SECRET_KEY = request.headers.get('x-api-secret-key');
		if (SECRET_KEY !== API_SECRET_KEY) {
			return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
		}
	}

	return NextResponse.next();
};

export default async function middleware(request: NextRequestWithAuth) {
	const routePath = request.nextUrl.pathname;

	// Protect the /api routes with the API Secret Key
	if (routePath.startsWith('/api')) {
		return secureApiMiddleware(request);
	}

	// Protect the /home and /account routes with NextAuth
	if (routePath.startsWith('/home') || routePath.startsWith('/account')) {
		return withAuth(request);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/api(.*)', '/home(.*)'],
};

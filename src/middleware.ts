import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { logsEnvMiddleware } from '@/utils/middlewares/logsEnv';
import { rateLimiterMiddleware } from '@/utils/middlewares/rateLimiter';
import { cspMiddleware } from './utils/middlewares/contentSecurityPolicy';

export async function middleware(request: NextRequest) {
	logsEnvMiddleware();
	cspMiddleware(request);

	// Check rate limit for API routes
	if (request.nextUrl.pathname.startsWith('/api')) {
		// Call the rate limiter
		const rateLimitResponse = rateLimiterMiddleware(request);
		if (rateLimitResponse) {
			// Return the rate-limiting response if applicable
			return rateLimitResponse;
		}

		// Secure API route handler with secret key
		const apiSecretKey = request.headers.get('x-api-secret-key');
		return apiSecretKey !== process.env.API_SECRET_KEY
			? NextResponse.json({ message: 'Forbidden' }, { status: 403 })
			: NextResponse.next();
	}

	return await updateSession(request);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/api(.*)',
		'/home(.*)',
		'/login(.*)',
		'/((?!^$|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
};

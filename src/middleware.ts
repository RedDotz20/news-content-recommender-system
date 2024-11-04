import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { logsEnvMiddleware } from '@/utils/middlewares/logsEnv';
import { cspMiddleware } from './utils/middlewares/contentSecurityPolicy';
import { secureApiMiddleware } from './utils/middlewares/secureApiRoutes';

export async function middleware(request: NextRequest) {
	logsEnvMiddleware();
	cspMiddleware(request);
	secureApiMiddleware(request);

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

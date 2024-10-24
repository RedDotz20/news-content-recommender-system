import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
	if (process.env.NODE_ENV === 'development') {
		console.log('running in development mode');
	}

	if (process.env.NODE_ENV === 'production') {
		console.log('running in production mode');
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
	],
};

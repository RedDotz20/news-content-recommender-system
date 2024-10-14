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

const middleware = async (req: NextRequestWithAuth) => {
	const routePath = req.nextUrl.pathname;

	// Redirect authenticated users from '/auth' to '/home'
	if (routePath.startsWith('/auth')) {
		if (req.nextauth.token) {
			// Check if the user is authenticated
			return NextResponse.redirect(new URL('/home', req.url));
		}
	}

	// Protect the /api routes with the API Secret Key
	if (routePath.startsWith('/api')) {
		return secureApiMiddleware(req);
	}

	// Protect the /home and /account routes with NextAuth
	if (routePath.startsWith('/home') || routePath.startsWith('/account')) {
		return withAuth(req);
	}

	return NextResponse.next();
};

export default withAuth(middleware, {
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		authorized: ({ token }) => {
			// Add your role-based authorization logic if necessary
			return true; // Modify according to your needs
		},
	},
});

export const config = {
	matcher: ['/api(.*)', '/home(.*)', '/auth(.*)'],
};

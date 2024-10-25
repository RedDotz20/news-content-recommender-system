import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get('next') ?? '/home'; // redirects to /home route after authentication

	if (code) {
		const supabase = createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
			const isLocalEnv = process.env.NODE_ENV === 'development';
			if (isLocalEnv) {
				// we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
				console.log('redirect origin isLocal, code: ', code);
				return NextResponse.redirect(`${origin}${next}`);
			} else if (forwardedHost) {
				console.log('forwarded host redirect, code: ', code);
				return NextResponse.redirect(`https://${forwardedHost}${next}`);
			} else {
				console.log('redirect origin else, code: ', code);
				return NextResponse.redirect(`${origin}${next}`);
			}
		}
	}

	console.log('redirect error page');
	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/error`);
}

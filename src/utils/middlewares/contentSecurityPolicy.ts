import { NextRequest, NextResponse } from 'next/server';

export function cspMiddleware(request: NextRequest) {
  // Generate a nonce for inline scripts
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Define Content Security Policy
  const cspHeader = `
		default-src 'self';
		script-src 'self' 'nonce-${nonce}' 'https://accounts.google.com' 'https://apis.google.com' 'strict-dynamic';
		style-src 'self' 'nonce-${nonce}' 'https://accounts.google.com' 'https://fonts.googleapis.com';
		img-src 'self' blob: data: 'https://accounts.google.com' 'https://lh3.googleusercontent.com';
		connect-src 'self' 'https://auth.supabase.co' 'https://*.supabase.co' 'https://accounts.google.com';
		font-src 'self' 'https://fonts.gstatic.com';
		frame-src 'self' 'https://accounts.google.com';
		object-src 'none';
		base-uri 'self';
		form-action 'self' 'https://accounts.google.com';
		frame-ancestors 'none';
		upgrade-insecure-requests;
		block-all-mixed-content;
 `;

  // Compact the CSP by removing unnecessary spaces and line breaks
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

  // Clone the request headers and set the nonce and CSP
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Create the response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  // Set CSP in the response headers
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  return response;
}

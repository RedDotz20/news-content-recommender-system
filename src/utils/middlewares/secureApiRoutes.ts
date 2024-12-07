import { NextResponse, type NextRequest } from 'next/server';
import { rateLimiterMiddleware } from './rateLimiter';

export async function secureApiMiddleware(request: NextRequest) {
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
}

import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		// username: string | null;
		email: string | null;
		// id: string;
	}

	// Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	interface Session {
		user: User & {
			// username: string;
			email: string | null;
			//  id: string
		};
		token: {
			username: string;
		};
	}
}

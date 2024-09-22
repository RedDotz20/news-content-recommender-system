// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		// username: string | null;
		email: string | null;
		// id: string;
	}

	/* eslint-disable no-unused-vars */
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
	/* eslint-enable no-unused-vars */
}

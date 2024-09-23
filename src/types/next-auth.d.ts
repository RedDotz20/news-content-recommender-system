// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		email: string | null;
		id: string;
		provider: string;
	}

	/* eslint-disable no-unused-vars */
	interface Session {
		user: User & {
			email: string | null;
			id: string;
			provider: string;
		};
		token: {
			username: string;
		};
	}
	/* eslint-enable no-unused-vars */
}

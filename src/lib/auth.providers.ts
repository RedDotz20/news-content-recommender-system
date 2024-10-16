import { NextAuthOptions } from 'next-auth';
import { compare } from 'bcrypt';
import { prisma } from './db';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const credentials = CredentialsProvider({
	name: 'Credentials',
	credentials: {
		email: { label: 'Email', type: 'email' },
		password: { label: 'Password', type: 'password' },
	},
	async authorize(credentials) {
		if (!credentials?.email || !credentials?.password) {
			return null;
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: credentials.email,
			},
		});

		if (!existingUser) {
			return null;
		}

		if (existingUser.password) {
			const passwordMatch = await compare(
				credentials.password,
				existingUser.password
			);
			if (!passwordMatch) {
				return null;
			}
		}

		return {
			id: existingUser.id.toString(),
			name: existingUser.name,
			email: existingUser.email,
		};
	},
});

const google = GoogleProvider({
	clientId: process.env.GOOGLE_CLIENT_ID as string,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
	//? make the user relogin with google prompt
	// authorization: `https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login`,
	authorization: {
		params: {
			prompt: 'consent',
			access_type: 'offline',
			response_type: 'code',
		},
	},
});

export default {
	providers: [credentials, google],
} satisfies NextAuthOptions;

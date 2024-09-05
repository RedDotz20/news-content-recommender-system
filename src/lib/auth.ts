import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { db } from './db';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
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
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'john@mail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const existingUser = await db.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!existingUser) {
					return null;
				}

				const passwordMatch = await compare(
					credentials.password,
					existingUser.password
				);

				if (!passwordMatch) {
					return null;
				}

				return {
					id: existingUser.id.toString(),
					username: existingUser.username,
					email: existingUser.email,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile }) {
			if (user) {
				return {
					...token,
					username: user.username,
				};
			}
			return token;
		},
		async session({ session, token, user }) {
			return {
				...session,
				user: {
					...session.user,
					username: token.username,
				},
			};
		},
	},
};

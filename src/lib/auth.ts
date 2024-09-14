import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { db } from './db';
import authConfig from './auth.config';

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
		signIn: '/auth',
		newUser: '/auth',
	},
	...authConfig,
	// providers: [
	// 	GithubProvider({
	// 		clientId: process.env.GITHUB_ID as string,
	// 		clientSecret: process.env.GITHUB_SECRET as string,
	// 	}),
	// 	GoogleProvider({
	// 		clientId: process.env.GOOGLE_CLIENT_ID as string,
	// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
	// 		//? make the user relogin with google prompt
	// 		// authorization: `https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login`,
	// 		authorization: {
	// 			params: {
	// 				prompt: 'consent',
	// 				access_type: 'offline',
	// 				response_type: 'code',
	// 			},
	// 		},
	// 	}),
	// 	CredentialsProvider({
	// 		name: 'Credentials',
	// 		credentials: {
	// 			email: { label: 'Email', type: 'email' },
	// 			password: { label: 'Password', type: 'password' },
	// 		},
	// 		async authorize(credentials) {
	// 			if (!credentials?.email || !credentials?.password) {
	// 				return null;
	// 			}

	// 			const existingUser = await db.user.findUnique({
	// 				where: {
	// 					email: credentials.email,
	// 				},
	// 			});

	// 			if (!existingUser) {
	// 				return null;
	// 			}

	// 			if (existingUser.password) {
	// 				const passwordMatch = await compare(
	// 					credentials.password,
	// 					existingUser.password
	// 				);
	// 				if (!passwordMatch) {
	// 					return null;
	// 				}
	// 			}

	// 			return {
	// 				id: existingUser.id.toString(),
	// 				name: existingUser.name,
	// 				email: existingUser.email,
	// 			};
	// 		},
	// 	}),
	// ],
	callbacks: {
		async jwt({ token, user, profile, account }) {
			if (user) {
				return {
					...token,
					id: user.id.toString(),
					name: user.name,
				};
			}

			if (profile?.email) {
				const existingUser = await db.user.findUnique({
					where: {
						email: profile.email,
					},
				});

				if (existingUser) {
					return {
						...token,
						id: existingUser.id.toString(),
						name: existingUser.name,
						email: existingUser.email,
					};
				}
			}

			return token;
		},
		async session({ session, token, user }) {
			return {
				...session,
				user: {
					...session.user,
					name: token.name,
					id: token.id,
				},
			};
		},
	},
};

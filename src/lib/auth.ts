import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';
import authConfig from './auth.config';

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
	...authConfig, // providers
	callbacks: {
		async jwt({ token, user, profile, account }) {
			if (user) {
				return {
					...token,
					id: user.id.toString(),
					name: user.name,
					provider: account?.provider,
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
						provider: account?.provider || token.provider,
						id: existingUser.id.toString(),
						name: existingUser.name,
						email: existingUser.email,
					};
				}
			}

			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					name: token.name,
					id: token.id,
					provider: token.provider,
				},
			};
		},
	},
};

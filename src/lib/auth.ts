import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './db';
import authProviders from './auth.providers';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth',
		newUser: '/auth',
	},
	...authProviders, // providers
	callbacks: {
		async signIn({ user, account, profile }) {
			try {
				// Ensure user ID is present
				const userId = user.id;
				if (!userId) {
					throw new Error('User ID is not available.');
				}

				// Check if user preferences already exist
				const userPreferences = await prisma.userPreferences.findUnique({
					where: { userId: userId },
				});

				// If no preferences exist, create default preferences
				if (!userPreferences) {
					await prisma.userPreferences.create({
						data: {
							userId: userId, // Foreign key linking to User
							preferences: {},
						},
					});
				}

				return true; // Return true to indicate successful sign-in
			} catch (error) {
				console.error('Error setting up user preferences', error);
				return false; // Return false to indicate failed sign-in
			}
		},
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
				const existingUser = await prisma.user.findUnique({
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

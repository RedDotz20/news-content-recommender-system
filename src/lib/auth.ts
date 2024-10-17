import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './db';
import authProviders from './auth.providers';

export const authOptions: NextAuthOptions = {
	// debug: true,
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
				if (user.email) {
					// Check if the user already exists
					const existingUser = await prisma.user.findUnique({
						where: { email: user.email },
					});

					// If the user exists, link the OAuth account if it's not already linked
					if (existingUser) {
						console.log(existingUser, 'existingUser');
						// If the email exists, potentially link the account or return true if already linked
						// You can implement logic to verify if the current account's provider corresponds to the existing user
						return true; // User exists and sign-in is successful
					} else {
						// If the user doesn't exist, create a new user account
						const newUser = await prisma.user.create({
							data: {
								name: user.name,
								email: user.email,
								image: user.image,
							},
						});
						console.log(newUser, 'newUser');

						// Handle Google sign-in specific logic
						if (account?.provider === 'google' && profile) {
							const existingGoogleUser = await prisma.user.findUnique({
								where: { email: profile.email },
							});

							// Create a user if not found
							if (!existingGoogleUser) {
								await prisma.user.create({
									data: {
										name: profile.name,
										email: profile.email,
										image: profile.image,
									},
								});
							}
						}
					}
				}

				return true;
			} catch (error) {
				console.error('Error signing in: ', error);
				return false; // Return false to indicate failed sign-in
			}
		},
		// async redirect({ url, baseUrl }) {
		// 	return `${baseUrl}/home`; // Redirect to /home after sign-in
		// },
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

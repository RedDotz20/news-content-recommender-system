import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './db';
import authProviders from './auth.providers';

export const authOptions: NextAuthOptions = {
	debug: true,
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
					throw new Error('Invalid User ID Not Provided');
				}

				// Handle Google sign-in
				if (account?.provider === 'google' && profile) {
					const existingUser = await prisma.user.findUnique({
						where: { email: profile.email },
					});

					// Create a user if not found
					if (!existingUser) {
						await prisma.user.create({
							data: {
								name: profile.name,
								email: profile.email,
								image: profile.image,
								// Add any additional fields required
							},
						});
					}
				}

				// 	const existingUser = await prisma.user.findUnique({
				// 		where: { email: profile.email },
				// });

				// // If user doesn't exist, create a new one
				// if (!existingUser) {
				// 		await prisma.user.create({
				// 				data: {
				// 						name: profile.name,
				// 						email: profile.email,
				// 						// Additional fields as necessary
				// 				},
				// 		});
				// }

				// Check if the user exists
				// const existingUser = await prisma.user.findUnique({
				// 	where: { id: userId },
				// });

				// if (!existingUser) {
				// 	throw new Error(`User with ID ${userId} does not exist.`);
				// }

				return true;
			} catch (error) {
				console.error('Error signing in: ', error);
				return false; // Return false to indicate failed sign-in
			}
		},
		async redirect({ url, baseUrl }) {
			return `${baseUrl}/home`; // Redirect to /home after sign-in
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

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

		// Find the user in the database by email
		const existingUser = await prisma.user.findUnique({
			where: {
				email: credentials.email,
			},
		});

		// If user does not exist, return null
		if (!existingUser) {
			return null;
		}

		// If user exists but doesn't have a password, reject the sign-in
		if (existingUser.password) {
			const passwordMatch = await compare(
				credentials.password,
				existingUser.password
			);
			if (!passwordMatch) {
				return null;
			}
		}

		// Check if user preferences exist; if not, create default preferences
		const userPreferences = await prisma.userPreferences.findUnique({
			where: { userId: existingUser.id },
		});

		if (!userPreferences) {
			await prisma.userPreferences.create({
				data: {
					userId: existingUser.id, // Foreign key linking to User
					preferences: {}, // Default to empty preferences
				},
			});
		}

		// Return the user object for successful sign-in
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
	authorization: {
		params: {
			prompt: 'consent',
			access_type: 'offline',
			response_type: 'code',
			allowDangerousEmailAccountLinking: true,
		},
	},
	async profile(profile) {
		// This function is used when Google provides the profile after login
		// Find user by email in the database
		let user = await prisma.user.findUnique({
			where: {
				email: profile.email,
			},
		});

		// If user doesn't exist, create a new user
		if (!user) {
			user = await prisma.user.create({
				data: {
					email: profile.email,
					name: profile.name,
					image: profile.picture,
				},
			});
		}

		// Ensure user preferences exist
		const userPreferences = await prisma.userPreferences.findUnique({
			where: { userId: user.id },
		});

		// If no preferences exist, create default preferences
		if (!userPreferences) {
			await prisma.userPreferences.create({
				data: {
					userId: user.id,
					preferences: {}, // Default empty preferences
				},
			});
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			image: user.image,
		};
	},
});

// excludes google temporarily
export default {
	providers: [credentials],
} satisfies NextAuthOptions;

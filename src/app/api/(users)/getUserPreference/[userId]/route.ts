import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
	const userId = req.nextUrl.searchParams.get('userId');

	// if (!userId) {
	// 	return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
	// }

	// try {
	// 	const userPreferences = await prisma.user.findUnique({
	// 		where: { id: userId },
	// 		select: {
	// 			id: true,
	// 			name: true,
	// 		},
	// 	});

	// 	if (!userPreferences || !userPreferences.userPreferences?.length) {
	// 		return NextResponse.json(
	// 			{ error: 'User preferences not found' },
	// 			{ status: 404 }
	// 		);
	// 	}

	// 	const preferencesData = userPreferences
	// 		.userPreferences[0] as UserPreferencesData;

	// 	const formattedUserPreferences = categories.map((category) => ({
	// 		category,
	// 		frequency: preferencesData[category as keyof UserPreferencesData], // Cast the category to the correct type
	// 	}));

	// 	return NextResponse.json(
	// 		{
	// 			user: {
	// 				id: userPreferences.id,
	// 				name: userPreferences.name,
	// 				userPreferences: formattedUserPreferences,
	// 			},
	// 		},
	// 		{ status: 200 }
	// 	);
	// } catch (error) {
	// 	console.error('Error fetching relevant preferences:', error);
	// 	return NextResponse.json(
	// 		{ error: 'Error fetching relevant preferences' },
	// 		{ status: 500 }
	// 	);
	// } finally {
	// 	await prisma.$disconnect();
	// }
}

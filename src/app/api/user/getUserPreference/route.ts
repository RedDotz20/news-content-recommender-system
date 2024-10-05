import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

type UserPreferencesData = {
	sports: number;
	science_technology: number;
	entertainment: number;
	health: number;
	politics: number;
};

export async function GET(req: NextRequest) {
	const userId = req.nextUrl.searchParams.get('userId');

	if (!userId) {
		return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
	}

	try {
		const userPreferences = await db.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				userPreferences: {
					select: {
						sports: true,
						science_technology: true,
						entertainment: true,
						health: true,
						politics: true,
					},
				},
			},
		});

		if (!userPreferences || !userPreferences.userPreferences?.length) {
			return NextResponse.json(
				{ error: 'User preferences not found' },
				{ status: 404 }
			);
		}

		const preferencesData = userPreferences
			.userPreferences[0] as UserPreferencesData;

		const categories = [
			'sports',
			'science_technology',
			'entertainment',
			'health',
			'politics',
		];

		const formattedUserPreferences = categories.map((category) => ({
			category,
			frequency: preferencesData[category as keyof UserPreferencesData], // Cast the category to the correct type
		}));

		return NextResponse.json(
			{
				user: {
					id: userPreferences.id,
					name: userPreferences.name,
					userPreferences: formattedUserPreferences,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching relevant preferences:', error);
		return NextResponse.json(
			{ error: 'Error fetching relevant preferences' },
			{ status: 500 }
		);
	} finally {
		await db.$disconnect();
	}
}

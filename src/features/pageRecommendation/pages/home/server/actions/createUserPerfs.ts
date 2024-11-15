'use server';

export const createUserPerfs = async (userId: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
	try {
		const response = await fetch(
			`${baseUrl}/api/createUserPreference/${userId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-secret-key': process.env.API_SECRET_KEY as string,
				},
			}
		);

		if (!response.ok) {
			const errorDetail = await response.text();
			throw new Error(`Failed to verify user preferences: ${errorDetail}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error in getDistinctCategories:', error);
		throw new Error(
			'Could not validate user preferences. Please try again later.'
		);
	}
};

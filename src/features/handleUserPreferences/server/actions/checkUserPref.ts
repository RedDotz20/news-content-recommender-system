'use server';

export const checkUserPref = async (userId: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
	try {
		const response = await fetch(
			`${baseUrl}/api/checkUserPreference/${userId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-secret-key': process.env.API_SECRET_KEY as string,
				},
			}
		);

		if (!response.ok) {
			const errorDetail = await response.json();
			throw new Error(`Failed to Verify Preferences: ${errorDetail.error}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error in checkUserPreference:', error);
		if (error instanceof Error) {
			// Re-throw with a detailed message, or handle as needed
			throw new Error(error.message);
		} else {
			throw new Error(
				'Could not validate user preferences. Please try again later.'
			);
		}
	}
};

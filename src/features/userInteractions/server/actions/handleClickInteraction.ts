'use server';

/**
 * Handles a user interaction by updating the user's preference categories.
 *
 * Sends a PUT request to update the user's preference categories.
 *
 * @param userId - The unique identifier of the user.
 * @param category - The category of the article.
 * @param frequencyVal - The frequency value associated with the article.
 *
 * @returns The data returned by the API if the request is successful.
 * @throws Will throw an error if the request fails or is aborted.
 */
export const handleClickInteraction = async (
	userId: string,
	category: string,
	frequencyVal: number
) => {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

	try {
		const response = await fetch(`${baseUrl}/api/updatePrefsArray/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-api-secret-key': process.env.API_SECRET_KEY as string,
			},
			body: JSON.stringify({
				pref: {
					categories: [{ category: category, frequency: frequencyVal }],
				},
			}),
		});

		if (!response.ok) {
			const errorDetail = await response.json();
			throw new Error(
				`Failed to execute handleClickInteraction: ${errorDetail.error}`
			);
		}

		const { data } = await response.json();
		return data;
	} catch (error) {
		const typedError = error as Error;

		if (typedError.name === 'AbortError') {
			console.log('Request was aborted by the user');
			return; // Exit early if the request was aborted
		}

		console.error('Error in handleClickInteraction:', typedError);
		throw new Error(
			`Could not perform user interaction update. Please try again later ${typedError}.`
		);
	}
};

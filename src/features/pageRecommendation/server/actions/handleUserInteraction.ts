'use server';

// TODO: implement handle user interaction
export const handleUserInteraction = async (
	userId: string,
	isLiked: boolean,
	articleId: string,
	category: string,
	frequencyVal: number
) => {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

	try {
		const method = isLiked ? 'DELETE' : 'POST';
		const response = await fetch(`${baseUrl}/api/likes/${userId}`, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'x-api-secret-key': process.env.API_SECRET_KEY as string,
			},
			body: JSON.stringify({ articleId, category, frequencyVal }),
		});

		if (!response.ok) {
			const errorDetail = await response.text();
			throw new Error(
				`Failed to execute handleUserInteraction: ${errorDetail}`
			);
		}

		const { data } = await response.json();
		return data;
	} catch (error) {
		console.error('Error in handleUserInteraction:', error);
		throw new Error(
			`Could not perform user interaction update. Please try again later ${error}.`
		);
	}
};

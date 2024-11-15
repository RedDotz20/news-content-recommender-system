'use server';

export const handleUserInteraction = async (
	userId: string,
	isLiked: boolean,
	articleId: string,
	category: string,
	frequencyVal: number,
	signal?: AbortSignal //TODO: Optional AbortSignal for request cancellation
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
			signal,
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
		const typedError = error as Error; // Type assertion
		if (typedError.name === 'AbortError') {
			console.log('Request was aborted by the user');
			return; // Exit early if the request was aborted
		}

		console.error('Error in handleUserInteraction:', typedError);
		throw new Error(
			`Could not perform user interaction update. Please try again later ${typedError}.`
		);
	}
};

'use server';

interface CategoryResponse {
	count: number;
	category: string[];
}

interface ErrorResponse {
	error: string;
}

export const getDistinctCategories = async (): Promise<
	CategoryResponse | ErrorResponse
> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

		if (!baseUrl) {
			throw new Error(
				'Environment variables for base URL or API secret key are not defined.'
			);
		}

		const response = await fetch(`${baseUrl}/api/getDistinctCategories`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-secret-key': process.env.API_SECRET_KEY as string,
			},
		});

		if (!response.ok) {
			const statusText = response.statusText || 'Unknown error';
			throw new Error(
				`Failed to fetch categories: ${response.status} ${statusText}`
			);
		}

		const result: CategoryResponse | ErrorResponse = await response.json();
		return result;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error in getDistinctCategories:', error);
		} else {
			console.error(
				'Error in getDistinctCategories:',
				'An unknown error occurred'
			);
		}

		return {
			error: 'Could not retrieve list of categories. Please try again later.',
		};
	}
};

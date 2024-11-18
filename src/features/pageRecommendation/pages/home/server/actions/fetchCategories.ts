'use server';

// import { Articles } from '@prisma/client';

interface DistinctCategoriesType {
	count: number;
	category: string[];
}

export const getDistinctCategories =
	async (): Promise<DistinctCategoriesType> => {
		try {
			const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
			const apiSecretKey = process.env.API_SECRET_KEY;

			// Check if essential environment variables are defined
			if (!baseUrl || !apiSecretKey) {
				throw new Error(
					'Environment variables for base URL or API secret key are not defined.'
				);
			}

			const response = await fetch(`${baseUrl}/api/getDistinctCategories`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-secret-key': apiSecretKey,
				},
			});

			if (!response.ok) {
				const statusText = response.statusText || 'Unknown error';
				throw new Error(
					`Failed to fetch categories: ${response.status} ${statusText}`
				);
			}

			const result: DistinctCategoriesType = await response.json();
			return result;
		} catch (error) {
			// Log the error for debugging
			console.error('Error in getDistinctCategories:', error);

			// Throw a user-friendly error
			throw new Error(
				'Could not retrieve list of categories. Please try again later.'
			);
		}
	};

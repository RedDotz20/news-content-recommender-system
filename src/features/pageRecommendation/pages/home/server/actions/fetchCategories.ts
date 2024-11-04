'use server';

import { Articles } from '@prisma/client';

interface distinctCategoriesType {
	count: number;
	category: string[];
}

export const getDistinctCategories =
	async (): Promise<distinctCategoriesType> => {
		try {
			const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

			const response = await fetch(`${baseUrl}/api/getDistinctCategories`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-secret-key': process.env.API_SECRET_KEY as string,
				},
			});

			if (!response.ok) {
				const errorDetail = await response.text();
				throw new Error(`Failed to fetch categories: ${errorDetail}`);
			}

			const result: distinctCategoriesType = await response.json();
			return result;
		} catch (error) {
			console.error('Error in getDistinctCategories:', error);
			throw new Error(
				'Could not retrieve list of categories. Please try again later.'
			);
		}
	};

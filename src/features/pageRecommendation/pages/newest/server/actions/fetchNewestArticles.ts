'use server';

import { Articles } from '@prisma/client';

export const getNewestArticles = async (
	limit: number = 10
): Promise<Articles[]> => {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

	try {
		const response = await fetch(
			`${baseUrl}/api/getLatestArticles?limit=${limit}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-secret-key': process.env.API_SECRET_KEY as string,
				},
			}
		);

		if (!response.ok) {
			const errorDetail = await response.text();
			throw new Error(`Failed to fetch articles: ${errorDetail}`);
		}

		const result: { data: Articles[] } = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error in getNewestArticles:', error);
		throw new Error(
			'Could not retrieve the newest articles. Please try again later.'
		);
	}
};

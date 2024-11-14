'use server';

import { Articles } from '@prisma/client';

type UserInteraction = {
	id: string;
	isLiked: boolean;
};

export type getArticlesType = Articles & {
	userInteractions?: UserInteraction[];
	isLiked: boolean;
};

export const getArticles = async (userId: string, limit: number = 10) => {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

	try {
		const response = await fetch(
			`${baseUrl}/api/getArticles/${userId}?limit=${limit}`,
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
			throw new Error(
				`Failed to fetch articles: ${`${baseUrl}/api/getArticles${userId}?limit=${limit}`} ${errorDetail}`
			);
		}

		const { data } = await response.json();
		return data as getArticlesType[];
	} catch (error) {
		console.error('Error in getNewestArticles:', error);
		throw new Error(
			`Could not retrieve the newest articles. Please try again later ${error}.`
		);
	}
};

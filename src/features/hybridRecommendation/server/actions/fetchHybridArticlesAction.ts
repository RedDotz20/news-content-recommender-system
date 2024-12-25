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

export const getHybridArticles = async (userId: string, baseTarget: number = 30) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  try {
    const response = await fetch(
      `${baseUrl}/api/getHybridArticles/${userId}?baseTarget=${baseTarget}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-secret-key': process.env.API_SECRET_KEY as string
        }
      }
    );

    if (!response.ok) {
      console.error(response.status);
      throw new Error(`HTTP error: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data as getArticlesType[];
  } catch (error) {
    console.log('Error in getHybridArticles:', error);
    throw new Error(`Could not retrieve the hybrid articles. Please try again later ${error}.`);
  }
};

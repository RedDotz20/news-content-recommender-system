'use client';

import { useQuery } from '@tanstack/react-query';
import { getArticles } from '../server/actions/fetchRandomArticlesAction';

export const useFetchRandomArticles = (userId: string) => {
	return useQuery({
		queryKey: ['randomArticles', userId],
		queryFn: () => getArticles(userId, 50),
		enabled: !!userId,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
};

// export const prefetchNewestArticles = {
// 	queryKey: ['newestArticles'],
// 	queryFn: async () => await getNewestArticles(),
// };

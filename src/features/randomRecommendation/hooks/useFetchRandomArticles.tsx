'use client';

import { useQuery } from '@tanstack/react-query';
import { getArticles } from '../server/actions/fetchArticles';
// import { getNewestArticles } from '../server/actions/fetchNewestArticles';

export const useFetchRandomArticles = (userId: string) => {
	return useQuery({
		queryKey: ['randomArticles'],
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

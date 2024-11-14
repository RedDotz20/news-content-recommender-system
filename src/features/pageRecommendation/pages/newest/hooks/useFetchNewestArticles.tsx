'use client';

import { useQuery } from '@tanstack/react-query';
import { getArticles } from '../server/actions/fetchArticles';
// import { getNewestArticles } from '../server/actions/fetchNewestArticles';

// const newestArticlesQueryKey = ['newestArticles'];
// const newestArticlesQueryFn = async () => await getNewestArticles();

export const useFetchNewestArticles = (userId: string) => {
	return useQuery({
		queryKey: ['newestArticles'],
		queryFn: async () => await getArticles(userId, 50),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
};

// export const prefetchNewestArticles = {
// 	queryKey: ['newestArticles'],
// 	queryFn: async () => await getNewestArticles(),
// };

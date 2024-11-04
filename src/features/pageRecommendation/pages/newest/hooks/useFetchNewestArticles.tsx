'use client';

import { useQuery } from '@tanstack/react-query';
import { getNewestArticles } from '../server/actions/fetchNewestArticles';

const newestArticlesQueryKey = ['newestArticles'];
const newestArticlesQueryFn = async () => await getNewestArticles();

export const useFetchNewestArticles = () => {
	return useQuery({
		queryKey: newestArticlesQueryKey,
		queryFn: newestArticlesQueryFn,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
};

// export const prefetchNewestArticles = {
// 	queryKey: ['newestArticles'],
// 	queryFn: async () => await getNewestArticles(),
// };

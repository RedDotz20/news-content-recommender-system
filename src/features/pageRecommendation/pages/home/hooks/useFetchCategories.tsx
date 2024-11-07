'use client';

import { useQuery } from '@tanstack/react-query';
import { getDistinctCategories } from '../server/actions/fetchCategories';

const distinctCatQueryKey = ['distinctCategories'];
const distinctCatQueryFn = () => getDistinctCategories();

export const useFetchCategories = () => {
	return useQuery({
		queryKey: distinctCatQueryKey,
		queryFn: distinctCatQueryFn,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
};

// export const prefetchCategories = {
// 	queryKey: distinctCatQueryKey,
// 	queryFn: distinctCatQueryFn,
// };

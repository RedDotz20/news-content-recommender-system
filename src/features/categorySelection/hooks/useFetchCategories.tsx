'use client';

import { useQuery } from '@tanstack/react-query';
import { getDistinctCategories } from '../server/actions/fetchCategories';

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ['distinctCategories'],
    queryFn: () => getDistinctCategories(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true
  });
};

// export const prefetchCategories = {
// 	queryKey: ['distinctCategories'],
// 	queryFn: () => getDistinctCategories(),
// };

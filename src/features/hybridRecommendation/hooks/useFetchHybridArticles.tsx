'use client';

import { useQuery } from '@tanstack/react-query';
import { getHybridArticles } from '../server/actions/fetchHybridArticlesAction';

export const useFetchHybridArticles = (userId: string) => {
  return useQuery({
    queryKey: ['hybridArticles', userId],
    queryFn: () => getHybridArticles(userId, 30),
    enabled: !!userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true
  });
};

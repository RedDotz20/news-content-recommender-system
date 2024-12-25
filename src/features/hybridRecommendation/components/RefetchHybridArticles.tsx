'use client';

import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { useGetSessionData } from '@/features/auth/hooks/useGetSessionData';
import { LoadingSpinnerWithText } from '@/components/customui/LoadingSpinner';
import { useFetchHybridArticles } from '../hooks/useFetchHybridArticles';

export const HybridArticleRefetchBtn = () => {
  const {
    user: { id }
  } = useGetSessionData();

  const { refetch, isPending, isFetching, isLoading } = useFetchHybridArticles(id);

  return (
    <Button className="flex gap-2" disabled={isPending || isFetching} onClick={() => refetch()}>
      {isLoading ? (
        <LoadingSpinnerWithText />
      ) : (
        <>
          <RefreshCcw className={`${isPending || (isFetching && 'animate-spin')}`} />
          <span>{isPending || isFetching ? 'LOADING' : 'REFRESH'}</span>
        </>
      )}
    </Button>
  );
};

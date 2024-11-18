'use client';

import { Button } from '@/components/ui/button';
import { useFetchNewestArticles } from '../hooks/useFetchNewestArticles';
import { RefreshCcw } from 'lucide-react';
import { useGetSessionData } from '@/features/auth/hooks/useGetSessionData';
import { LoadingSpinnerWithText } from '@/components/customui/LoadingSpinner';

export const RefetchButton = () => {
	const {
		user: { id },
	} = useGetSessionData();

	const { refetch, isPending, isFetching, isLoading } =
		useFetchNewestArticles(id);

	return (
		<Button
			className="flex gap-2"
			disabled={isPending || isFetching}
			onClick={() => refetch()}
		>
			{isLoading ? (
				<LoadingSpinnerWithText />
			) : (
				<>
					<RefreshCcw
						className={`${isPending || (isFetching && 'animate-spin')}`}
					/>
					<span>{isPending || isFetching ? 'LOADING' : 'REFRESH'}</span>
				</>
			)}
		</Button>
	);
};

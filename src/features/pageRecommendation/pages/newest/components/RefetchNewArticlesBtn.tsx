'use client';

import { Button } from '@/components/ui/button';
import { useFetchNewestArticles } from '../hooks/useFetchNewestArticles';
import { RefreshCcw } from 'lucide-react';

export const RefetchButton = () => {
	const { refetch, isPending, isFetching, isLoading } =
		useFetchNewestArticles();

	return (
		<Button
			className="flex gap-2"
			disabled={isPending || isFetching}
			onClick={() => refetch()}
		>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<>
					<RefreshCcw
						className={`${isPending || (isFetching && 'animate-spin')}`}
					/>
					<span>REFRESH</span>
				</>
			)}
		</Button>
	);
};

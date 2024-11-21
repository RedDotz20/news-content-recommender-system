import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from '@/components/customui/LoadingSpinner';

export default function loading() {
	try {
		return (
			<div className="flex gap-2 items-center justify-center">
				<LoadingSpinner className="h-4 w-4" />
				<p className="text-gray-400 select-none">Loading</p>
			</div>
		);
	} catch (error) {
		console.error('Error rendering loading component:', error);
		return <div>Error loading content. Please try again later.</div>;
	}
}

export const LoadingCards = () => {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[320px] w-[300px] rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-6 w-[300px]" />
				<Skeleton className="h-4 w-[300px]" />
				<Skeleton className="h-4 w-[300px]" />
			</div>
		</div>
	);
};

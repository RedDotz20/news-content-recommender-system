import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function loading() {
	return (
		<div className="flex justify-center items-center flex-wrap gap-6 overflow-hidden px-6 sm:px-8 md:px-12">
			<LoadingCards />
			<LoadingCards />
			<LoadingCards />
			<LoadingCards />
			<LoadingCards />
			<LoadingCards />
			<LoadingCards />
			<LoadingCards />
		</div>
	);
}

const LoadingCards = () => {
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
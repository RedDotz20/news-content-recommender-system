import { PropsWithChildren } from 'react';
// import {
// 	QueryClient,
// 	HydrationBoundary,
// 	dehydrate,
// } from '@tanstack/react-query';
import { RefetchButton } from './components/RefetchNewArticlesBtn';
// import { getNewestArticles } from './server/actions/fetchNewestArticles';

export default async function NewestLayoutComponent({
	children,
}: PropsWithChildren) {
	// const queryClient = new QueryClient();

	// await queryClient.prefetchQuery({
	// 	queryKey: ['newestArticles'],
	// 	queryFn: () => getNewestArticles(),
	// 	staleTime: Infinity,
	// });

	return (
		// <HydrationBoundary state={dehydrate(queryClient)}>
		<div className="lg:px-6 h-full">
			<div className="flex justify-between w-full mb-4 px-8">
				<p className="~text-lg/2xl font-bold">Latest News</p>
				<RefetchButton />
			</div>
			{children}
		</div>
		// </HydrationBoundary>
	);
}

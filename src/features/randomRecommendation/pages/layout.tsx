import { PropsWithChildren } from 'react';
// import {
// 	QueryClient,
// 	HydrationBoundary,
// 	dehydrate,
// } from '@tanstack/react-query';
import { RandomArticleRefetchBtn } from '../components/RefetchRandomArticles';
// import { getNewestArticles } from './server/actions/fetchNewestArticles';

export default async function RandomLayoutComponent({
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
		<div className="lg:px-6 h-full w-full">
			<div className="flex justify-between w-full mb-4 px-8">
				<p className="~text-lg/2xl font-bold">Random News Article</p>
				<RandomArticleRefetchBtn />
			</div>
			{children}
		</div>
		// </HydrationBoundary>
	);
}

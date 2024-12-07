import { PropsWithChildren } from 'react';
// import {
// 	QueryClient,
// 	HydrationBoundary,
// 	dehydrate,
// } from '@tanstack/react-query';
import { RandomArticleRefetchBtn } from '../components/RefetchRandomArticles';
// import { getNewestArticles } from './server/actions/fetchNewestArticles';

export default async function RandomLayoutComponent({ children }: PropsWithChildren) {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  // 	queryKey: ['newestArticles'],
  // 	queryFn: () => getNewestArticles(),
  // 	staleTime: Infinity,
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <div className="h-full w-full lg:px-6">
      <div className="mb-2 flex w-full justify-between px-6 sm:px-8 md:px-12">
        <p className="font-bold ~text-lg/2xl">Random News Article</p>
        <RandomArticleRefetchBtn />
      </div>
      {children}
    </div>
    // </HydrationBoundary>
  );
}

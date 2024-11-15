// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Articles } from '@prisma/client';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { getNewestArticles } from '../server/actions/fetchNewestArticles';
// import { ArticleCard } from '@/components/ArticleCard';

// interface ArticlesProps {
// 	initialData: Articles[];
// }

// export default function ArticlesInfiniteScrolling({
// 	initialData,
// }: ArticlesProps) {
// 	const observerRef = useRef<HTMLDivElement | null>(null);
// 	const limit = 10; // Number of articles to load per fetch

// 	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
// 		useInfiniteQuery(
// 			['articles'], // Unique query key
// 			async ({ pageParam = 0 }) => {
// 				const response = await getNewestArticles(limit);
// 				return response.data; // Make sure this is the correct structure
// 			},
// 			{
// 				initialData: {
// 					pages: [initialData || []], // Ensure initialData is defined
// 					pageParams: [0],
// 				},
// 				getNextPageParam: (lastPage, allPages) => {
// 					// Check if the last page has less than limit articles
// 					return lastPage.length === limit ? allPages.length : undefined; // Use total pages loaded as a way to signal more data
// 				},
// 				// Optionally, implement getPreviousPageParam if needed
// 			}
// 		);

// 	const articles = data?.pages.flat() || [];

// 	const loadMoreArticles = useCallback(
// 		(entries: IntersectionObserverEntry[]) => {
// 			if (entries[0].isIntersecting && hasNextPage) {
// 				fetchNextPage();
// 			}
// 		},
// 		[fetchNextPage, hasNextPage]
// 	);

// 	useEffect(() => {
// 		const observer = new IntersectionObserver(loadMoreArticles, {
// 			threshold: 1.0,
// 		});
// 		if (observerRef.current) observer.observe(observerRef.current);

// 		return () => {
// 			if (observerRef.current) observer.unobserve(observerRef.current);
// 		};
// 	}, [loadMoreArticles]);

// 	return (
// 		<>
// 			{articles.map((article) => (
// 				<ArticleCard
// 					id={article.id}
// 					key={article.id}
// 					headline={article.headline}
// 					authors={article.authors as string}
// 					short_description={article.short_description as string}
// 					date={article.date}
// 					category={article.category}
// 				/>
// 			))}
// 			{isFetchingNextPage && <p>Loading more articles...</p>}
// 			<div
// 				ref={observerRef}
// 				style={{ height: '10px' }}
// 			/>
// 			{!hasNextPage && <p>No more articles available.</p>}
// 		</>
// 	);
// }

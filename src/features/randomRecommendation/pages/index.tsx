'use client';

// import { useEffect, useState, useContext } from 'react';
import { BoxLoader } from '@/components/customui/BoxLoader';
import { ArticleCards } from '@/features/articles/components/ArticleCard';
import { useFetchRandomArticles } from '../hooks/useFetchRandomArticles';
import { useGetSessionData } from '@/features/auth/hooks/useGetSessionData';
import { ScrollToTopButton } from '@/components/customui/ScrollToTopButton';

export default function RandomArticlesComponent() {
	const {
		user: { id: userId },
	} = useGetSessionData();

	const { data, isPending, error, isLoading } = useFetchRandomArticles(userId);

	if (error) return 'An error has occurred: ' + error.message;

	if (isPending || isLoading) {
		return <BoxLoader />;
	}

	// console.log(data.map((article) => article.headline));

	//TODO: Fix fade in transition on refetch
	// const [fadeIn, setFadeIn] = useState(false);

	// useEffect(() => {
	// 	if (isPending || isFetching) setFadeIn(false);
	// 	if (data) setFadeIn(true);
	// }, [data]);



	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4 transition-opacity duration-1000">
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-1 md:gap-2 lg:gap-4 lg:p-4 w-full">
				<ScrollToTopButton />
				{data.map((article) => {
					return (
						<ArticleCards
							userId={userId}
							id={article.id}
							isLiked={article.isLiked}
							key={article.id}
							link={article.link}
							headline={article.headline}
							authors={article.authors as string}
							short_description={article.short_description as string}
							date={article.date}
							category={article.category}
						/>
					);
				})}
			</div>
		</div>
	);
}

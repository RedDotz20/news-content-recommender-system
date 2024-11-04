'use client';

// import { useEffect, useState, useContext } from 'react';
import { BoxLoader } from '@/components/customui/BoxLoader';
import { ArticleCards } from '@/features/pageRecommendation/components/ArticleCard';
import { useFetchNewestArticles } from './hooks/useFetchNewestArticles';

export default function NewestArticlesComponent() {
	const { data, isPending, error, isFetching, isLoading } =
		useFetchNewestArticles();

	if (error) return 'An error has occurred: ' + error.message;

	if (isPending || isFetching || isLoading) {
		return <BoxLoader />;
	}

	//TODO: Fix fade in transition on refetch
	// const [fadeIn, setFadeIn] = useState(false);

	// useEffect(() => {
	// 	if (isPending || isFetching) setFadeIn(false);
	// 	if (data) setFadeIn(true);
	// }, [data]);

	return (
		<div
			className={`flex items-center justify-center w-full flex-col sm:px-4 transition-opacity duration-1000`}
		>
			<div className="flex flex-col justify-center lg:flex-row lg:flex-wrap gap-4 lg:p-4">
				{data.map((article) => {
					return (
						<ArticleCards
							id={article.id}
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

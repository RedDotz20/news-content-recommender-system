'use client';

import React from 'react';
import { ArticleCardProps } from '@/features/articles/types/articleCardType';
import { useMutateLikeInteract } from '../hooks/useMutateLikeInteract';
import { useMutateClickInteract } from '../hooks/useMutateClickInteract';
import { Button } from '@/components/ui/button';
import {
	// Bookmark,
	Heart,
} from 'lucide-react';

export const ClickInteractLink = (props: ArticleCardProps) => {
	const { userId, id: category } = props;
	const { mutate } = useMutateClickInteract(userId),
		frequencyVal: number = 2; // Set Frequency Value to increment w/ category

	return (
		<a
			href={props.link}
			target="_blank"
			rel="noopener noreferrer"
			className="flex-1"
			onClick={() => {
				mutate({ category, frequencyVal });
			}}
		>
			{props.children}
		</a>
	);
};

export const LikeInteractButton = (props: ArticleCardProps) => {
	const { userId, id: articleId, isLiked, category } = props,
		{ mutate } = useMutateLikeInteract(userId),
		frequencyVal: number = 10; // Set Frequency Value to increment w/ category

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-8 w-8"
			onClick={() => mutate({ isLiked, articleId, category, frequencyVal })}
		>
			<Heart
				className={`h-4 w-4 ${isLiked && 'fill-red-500 stroke-red-500'}`}
			/>
			<span className="sr-only">Like</span>
		</Button>
	);
};

// export const BookmarkInteractButton = (props: ArticleCardProps) => {
// 	// TODO: bookmark functionality
// 	const { userId, id: articleId, isLiked, category } = props,
// 		frequencyVal: number = 12; // Set Frequency Value to increment w/ category
// 	return (
// 		<Button
// 			variant="ghost"
// 			size="icon"
// 			className="h-8 w-8"
// 		>
// 			<Bookmark className="h-4 w-4" />
// 			<span className="sr-only">Bookmark</span>
// 		</Button>
// 	);
// };

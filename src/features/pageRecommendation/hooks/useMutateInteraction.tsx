'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleUserInteraction } from '../server/actions/handleUserInteraction';
import { getArticlesType } from '../pages/random/server/actions/fetchArticles';

type mutationType = {
	isLiked: boolean;
	articleId: string;
	category: string;
	frequencyVal: number;
};

export const useMutateInteraction = (
	userId: string,
	mutationQueryKey: string = 'randomArticles'
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['userInteraction'],
		mutationFn: ({
			isLiked,
			articleId,
			category,
			frequencyVal,
		}: mutationType) => {
			return handleUserInteraction(
				userId,
				isLiked,
				articleId,
				category,
				frequencyVal
			);
		},
		// Optimistic update logic
		onMutate: async ({ articleId, isLiked }) => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey: [mutationQueryKey, userId] });

			// Snapshot previous articles
			const previousArticles = queryClient.getQueryData<getArticlesType[]>([
				mutationQueryKey,
			]);

			// Optimistically update the specific article's isLiked state
			queryClient.setQueryData([mutationQueryKey], (old: getArticlesType[]) => {
				if (Array.isArray(old)) {
					return old.map((article) =>
						article.id === articleId
							? { ...article, isLiked: !isLiked }
							: article
					);
				}
				return old;
			});

			// Return context for potential rollback
			return { previousArticles };
		},

		// Roll back if the mutation fails
		onError: (err, _, context) => {
			if (err) {
				console.error(err);
			}

			if (context?.previousArticles) {
				queryClient.setQueryData(
					[mutationQueryKey, userId],
					context.previousArticles
				);
			}
		},

		// Revalidate data after mutation to ensure cache consistency
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [mutationQueryKey] });
		},
	});
};

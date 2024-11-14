import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleUserInteraction } from '../server/actions/handleUserInteraction';
import { getArticlesType } from '../pages/newest/server/actions/fetchArticles';

type mutationType = {
	isLiked: boolean;
	articleId: string;
	category: string;
	frequencyVal: number;
};

export const useMutateInteraction = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			isLiked,
			articleId,
			category,
			frequencyVal,
		}: mutationType) =>
			handleUserInteraction(userId, isLiked, articleId, category, frequencyVal),

		// Optimistic update logic
		onMutate: async ({ articleId, isLiked }) => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey: ['newestArticles', userId] });

			// Snapshot previous articles
			const previousArticles = queryClient.getQueryData<getArticlesType[]>([
				'newestArticles',
			]);

			// Optimistically update the specific article's isLiked state
			queryClient.setQueryData(['newestArticles'], (old: getArticlesType[]) => {
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
					['newestArticles', userId],
					context.previousArticles
				);
			}
		},

		// Revalidate data after mutation to ensure cache consistency
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['newestArticles'] });
		},
	});
};

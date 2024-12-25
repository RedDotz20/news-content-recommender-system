'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleLikeInteraction } from '../server/actions/handleLikeInteraction';
import { getArticlesType } from '../../articles/types/articleType';
import { usePathname } from 'next/navigation';
import { z } from 'zod';

type userInteractMutationType = {
  isLiked: boolean;
  articleId: string;
  category: string;
  frequencyVal: number;
};

const userIdSchema = z.string().min(1, 'User ID must not be empty').uuid();

export const useMutateLikeInteract = (userId: string) => {
  const validatedUserId = userIdSchema.parse(userId);
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const isHomePage = pathname === '/home';
  const mutationQueryKey = isHomePage ? 'hybridArticles' : 'randomArticles';

  // Store the current AbortController
  let controller: AbortController | null = null;

  return useMutation({
    mutationKey: ['userLikeInteraction'],
    mutationFn: async ({
      isLiked,
      articleId,
      category,
      frequencyVal
    }: userInteractMutationType) => {
      // If there's an existing controller, abort the previous request
      if (controller) controller.abort();

      // Create a new AbortController for this mutation
      controller = new AbortController();
      const signal = controller.signal;

      try {
        return await handleLikeInteraction(
          validatedUserId,
          isLiked,
          articleId,
          category,
          frequencyVal,
          signal
        );
      } catch (error) {
        const typedError = error as Error;
        if (typedError.name === 'AbortError') {
          console.error('Mutation was aborted');
          return;
        }
        throw error;
      }
    },
    // Optimistic update
    onMutate: async ({ articleId, isLiked }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [mutationQueryKey, validatedUserId]
      });

      // Snapshot previous articles
      const previousArticles = queryClient.getQueryData<getArticlesType[]>([mutationQueryKey]);

      // Optimistically update the specific article's isLiked state
      queryClient.setQueryData([mutationQueryKey, validatedUserId], (old: getArticlesType[]) => {
        if (Array.isArray(old)) {
          return old.map((article) =>
            article.id === articleId ? { ...article, isLiked: !isLiked } : article
          );
        }
        return old;
      });

      // Return context for potential rollback
      return { previousArticles };
    },
    onSuccess: () => {
      console.log('Like Interaction recorded successfully');
    },

    // Roll back if the mutation fails
    onError: (err, _, context) => {
      if (err) console.error(err);
      if (context?.previousArticles) {
        queryClient.setQueryData([mutationQueryKey, validatedUserId], context.previousArticles);
      }
    }
    // optional:
    // add onSettled to invalidate the query cache after successful mutation
  });
};

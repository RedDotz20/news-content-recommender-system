'use client';

import { useMutation } from '@tanstack/react-query';
import { handleClickInteraction } from '../server/actions/handleClickInteraction';
import { z } from 'zod';

type userInteractMutationType = {
	category: string;
	frequencyVal: number;
};

const userIdSchema = z.string().min(1, 'User ID must not be empty').uuid();

export const useMutateClickInteract = (userId: string) => {
	const validatedUserId = userIdSchema.parse(userId);

	return useMutation({
		mutationKey: ['userClickInteraction', validatedUserId],
		mutationFn: ({ category, frequencyVal }: userInteractMutationType) => {
			return handleClickInteraction(validatedUserId, category, frequencyVal);
		},
		onSuccess: () => {
			console.log('User click interaction recorded successfully');
		},
		onError: (err) => {
			if (err) console.error(err);
		},

		onSettled: () => {
			// queryClient.invalidateQueries({ queryKey: [mutationQueryKey] });
		},
	});
};

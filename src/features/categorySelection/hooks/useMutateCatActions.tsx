'use client';

import { checkUserPref } from '@/features/handleUserPreferences/server/actions/checkUserPref';
import { createUserPerfs } from '@/features/handleUserPreferences/server/actions/createUserPerfs';
import { updateUserPerfs } from '@/features/handleUserPreferences/server/actions/updateUserPerfs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const mutatePreferenceSchema = z.object({
  userId: z.string().uuid(),
  preferences: z.object({
    categories: z.array(
      z.object({
        category: z.string(),
        frequency: z.number()
      })
    )
  })
});

const userIdSchema = z.string().min(1, 'User ID must not be empty').uuid();

export const useMutateCatActions = (userId: string) => {
  const validatedUserId = userIdSchema.parse(userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['mutateCatActions', validatedUserId],
    mutationFn: async ({ userId, preferences }: z.infer<typeof mutatePreferenceSchema>) => {
      //? check if user exists in preferences (GET)
      const userExists = await checkUserPref(userId);

      if (userExists) {
        //? if user exists, update preferences with categories (PUT)
        const updatePrefOne = await updateUserPerfs(userId, preferences);
        return await updatePrefOne;
      } else {
        //? if user does not exist, create new user with categories (POST)
        const newUser = await createUserPerfs(userId);
        if (newUser.response.ok) {
          const updatePrefTwo = await updateUserPerfs(userId, preferences);
          return await updatePrefTwo;
        }
      }
    },
    onSuccess: async () => {
      console.log('newMutateCatActionss Successfully Executed');
    },
    onError: async (error) => {
      console.error('Error in newMutateCatActions:', error);
      throw new Error('Failed to mutate category actions.');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['isPreferencesExists', validatedUserId]
      });
    }
  });
};

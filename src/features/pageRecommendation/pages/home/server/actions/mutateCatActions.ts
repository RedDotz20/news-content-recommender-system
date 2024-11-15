'use server';

import { actionClient } from '@/lib/safe-action';
import { checkUserPref } from './checkUserPref';
import { updateUserPerfs } from './updateUserPerfs';
import { createUserPerfs } from './createUserPerfs';
import { mutatePreferenceSchema } from '../schema/updateUserPerfsSchema';

export const mutateCategoryAction = actionClient
	.schema(mutatePreferenceSchema)
	.action(async ({ parsedInput: { userId, preferences } }) => {
		try {
			if (userId) {
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
			}
		} catch (error) {
			console.error('Error in newMutateCatActions:', error);
			throw new Error('Failed to mutate category actions.');
		}
	});

// export const mutateCatActions = async (
// 	userId: string,
// 	selectedCat: CategorialPreferenceType[]
// ) => {};

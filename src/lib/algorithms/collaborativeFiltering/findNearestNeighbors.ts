import { calcCosSim } from './calcCosSim';
import { normPerfs } from './normPrefs';

// using k-nearest neighbors

//TODO: fix userPreferences TYPE

export function findKNearestNeighbors(
	userId: string,
	userPreferences: any[],
	k: number
) {
	const targetUser = userPreferences.find((user) => user.userId === userId);

	if (!targetUser) {
		throw new Error(`User with ID ${userId} not found`);
	}

	const similarities: { userId: string; similarity: number }[] = [];

	// const normalizedUserA = normPerfs(userAPreferences);
	// const normalizedUserB = normPerfs(userBPreferences);

	userPreferences.forEach((otherUser) => {
		if (otherUser.userId !== userId) {
			const similarity = calcCosSim(
				targetUser.preferences,
				otherUser.preferences
			);
			similarities.push({ userId: otherUser.userId, similarity });
		}
	});

	// Sort by similarity in descending order and select the top K neighbors
	return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, k);
}

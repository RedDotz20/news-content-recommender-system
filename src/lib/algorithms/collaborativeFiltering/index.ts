import { normPerfs } from './normPrefs';
import { valInputArr } from './valInputArr';
import { calcCosSim } from './calcCosSim';

/**
 * Calculates the cosine similarity between two normalized users' category preferences.
 *
 * @param userAPreferences - Normalized frequency array of user A's category preferences.
 * @param userBPreferences - Normalized frequency array of user B's category preferences.
 * @returns The cosine similarity between user A and user B preferences, ranging from -1 to 1.
 * @throws Error if any input is not an array or if arrays are empty.
 */
export function collaborativeFiltering(
	userAPreferences: number[],
	userBPreferences: number[]
): number {
	valInputArr(userAPreferences, userBPreferences);

	const normalizedUserA = normPerfs(userAPreferences);
	const normalizedUserB = normPerfs(userBPreferences);

	// If normalization results in empty arrays, return similarity of 0
	if (!normalizedUserA.length || !normalizedUserB.length) {
		return 0;
	}

	return calcCosSim(normalizedUserA, normalizedUserB);
}

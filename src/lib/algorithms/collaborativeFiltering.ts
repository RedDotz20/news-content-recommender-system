import { normalizePreferences } from './normalizePreferences';

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
	validateInputArrays(userAPreferences, userBPreferences);

	const normalizedUserA = normalizePreferences(userAPreferences);
	const normalizedUserB = normalizePreferences(userBPreferences);

	// If normalization results in empty arrays, return similarity of 0
	if (!normalizedUserA.length || !normalizedUserB.length) {
		return 0;
	}

	return calculateCosineSimilarity(normalizedUserA, normalizedUserB);
}

/**
 * Validates that input arrays are non-empty arrays.
 *
 * @param userAPreferences - First input array.
 * @param userBPreferences - Second input array.
 * @throws Error if any input is not an array or if arrays are empty.
 */
export function validateInputArrays(
	userAPreferences: any[],
	userBPreferences: any[]
): void {
	if (!Array.isArray(userAPreferences) || !Array.isArray(userBPreferences)) {
		throw new Error('Both inputs must be arrays');
	}

	if (!userAPreferences.length || !userBPreferences.length) {
		throw new Error('Input arrays must not be empty');
	}
}

/**
 * Calculates the cosine similarity between two arrays of numbers.
 *
 * @param userA - First array of numbers representing normalized preferences.
 * @param userB - Second array of numbers representing normalized preferences.
 * @returns The cosine similarity between user A and user B preferences, ranging from -1 to 1.
 * @throws Error if the lengths of the two arrays are not equal.
 */
export function calculateCosineSimilarity(
	userA: number[],
	userB: number[]
): number {
	if (userA.length !== userB.length) {
		throw new Error('Array lengths must be equal');
	}

	let dotProduct = 0;
	let magnitudeA = 0;
	let magnitudeB = 0;

	for (let i = 0; i < userA.length; i++) {
		dotProduct += userA[i] * userB[i];
		magnitudeA += userA[i] ** 2; // Squaring user A's preference
		magnitudeB += userB[i] ** 2; // Squaring user B's preference
	}

	magnitudeA = Math.sqrt(magnitudeA);
	magnitudeB = Math.sqrt(magnitudeB);

	// If either user has a magnitude of 0, return a similarity of 0
	if (magnitudeA === 0 || magnitudeB === 0) {
		return 0;
	}

	return dotProduct / (magnitudeA * magnitudeB);
}

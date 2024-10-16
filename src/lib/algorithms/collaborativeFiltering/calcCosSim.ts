/**
 * Calculates the Cosine Similarity between two arrays of numbers.
 *
 * @param userA - First array of numbers representing normalized preferences.
 * @param userB - Second array of numbers representing normalized preferences.
 * @returns The cosine similarity between user A and user B preferences, ranging from -1 to 1.
 * @throws Error if the lengths of the two arrays are not equal.
 */
export function calcCosSim(userA: number[], userB: number[]): number {
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

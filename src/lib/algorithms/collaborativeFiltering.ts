import { normalizePreferences } from './normalization';

/**
 * Calculate cosine similarity between two normalized users
 * @param userA - normalized frequency array of user A's category preferences
 * @param userB - normalized frequency array of user B's category preferences
 * @returns Cosine similarity between userA and userB
 */

export function calculateCosineSimilarity(userA: number[], userB: number[]) {
	if (userA.length !== userB.length) {
		throw new Error('Array lengths must be equal');
	}

	let dotProduct = 0;
	let magnitudeA = 0;
	let magnitudeB = 0;

	for (let i = 0; i < userA.length; i++) {
		dotProduct += userA[i] * userB[i];
		magnitudeA += Math.pow(userA[i], 2);
		magnitudeB += Math.pow(userB[i], 2);
	}

	magnitudeA = Math.sqrt(magnitudeA);
	magnitudeB = Math.sqrt(magnitudeB);

	if (magnitudeA === 0 || magnitudeB === 0) {
		return 0;
	}

	return dotProduct / (magnitudeA * magnitudeB);
}

export function CollaborativeFiltering(userA: number[], userB: number[]) {
	const normalizedUserA = normalizePreferences(userA);
	const normalizedUserB = normalizePreferences(userB);

	const cosineSimilarity = calculateCosineSimilarity(
		normalizedUserA,
		normalizedUserB
	);

	return cosineSimilarity;
}

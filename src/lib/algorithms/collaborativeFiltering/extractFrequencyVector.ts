import { PreferenceVectorType } from '@/types';

/**
 * Extract the frequency values from a preference vector, given all categories.
 *
 * @param prefVector - Preference vector object.
 * @param allCategories - Array of all categories.
 * @returns Array of frequency values, one for each category.
 * @throws Error if the input is not valid.
 */
export function extractFrequencyVector(
	prefVector: PreferenceVectorType,
	allCategories: string[]
): number[] {
	if (!prefVector || !Array.isArray(allCategories)) {
		throw new Error(
			'Invalid input: prefVector must be an object and allCategories must be an array.'
		);
	}

	return allCategories.map((category) => {
		if (typeof category !== 'string') {
			throw new Error(
				'Invalid category type: allCategories must contain only strings.'
			);
		}
		return prefVector[category] || 0;
	});
}

import { CategorialPreferenceType } from '@/types/userPreference';

/**
 * Finds the median preference from an array of categorical preferences.
 * @param {CategorialPreferenceType[]} preferences - The array of preferences from which to find the median.
 * @returns {CategorialPreferenceType} - The median preference.
 * @throws {Error} - Throws an error if the preferences array is empty or if no median candidates are found.
 *
 * Time Complexity: O(n log n) - Sorting the array of preferences takes O(n log n) time,
 * where n is the number of preferences. Filtering to find the median candidates takes O(n) time.
 *
 * Space Complexity: O(n) - A new array is created for sortedPreferences, which requires O(n) space.
 */
export function calculateMedianPreference(
	preferences: CategorialPreferenceType[]
): CategorialPreferenceType {
	// Handle case when preferences array is empty
	if (preferences.length === 0) {
		throw new Error('Preferences array cannot be empty');
	}

	// Sort preferences array by frequency
	const sortedPreferences = [...preferences].sort(
		(a, b) => a.frequency - b.frequency
	);
	const totalPreferences = sortedPreferences.length;
	const midIndex = Math.floor(totalPreferences / 2);
	const isOdd = totalPreferences % 2 !== 0;

	let medianCandidates: CategorialPreferenceType[];

	// Determine median candidates based on whether the number of preferences is odd or even
	if (isOdd) {
		// For odd count, select the middle element as the median
		const medianItem = sortedPreferences[midIndex];
		medianCandidates = sortedPreferences.filter(
			(item) => item.frequency === medianItem.frequency
		);
	} else {
		// For even count, select the two middle elements
		const lowerMiddle = sortedPreferences[midIndex - 1];
		const upperMiddle = sortedPreferences[midIndex];
		medianCandidates = sortedPreferences.filter(
			(item) =>
				item.frequency === lowerMiddle.frequency ||
				item.frequency === upperMiddle.frequency
		);
	}

	// Handle case when no candidates are found
	if (medianCandidates.length === 0) {
		throw new Error('No median candidates found');
	}

	// Randomly select one of the median candidates
	const randomIndex = Math.floor(Math.random() * medianCandidates.length);
	return medianCandidates[randomIndex];
}

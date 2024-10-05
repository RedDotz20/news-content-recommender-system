import { CategorialPreferenceType } from '@/types/userPreference';

/**
 * Sorts a user's preferences based on their frequency in descending order.
 *
 * @param preferences Array of user preferences
 * @returns Sorted array of preferences
 * @throws Error if the input is not a non-empty array.
 * @performance
 * Time Complexity: O(n^2) in the average and worst case due to the insertion process.
 * Space Complexity: O(n) for the sorted array.
 */

export function insertionSort(
	preferences: CategorialPreferenceType[]
): CategorialPreferenceType[] {
	// Ensure the input is a non-empty array
	if (!Array.isArray(preferences) || preferences.length === 0) {
		throw new Error('Invalid input: preferences must be a non-empty array.');
	}

	const sortedPreferences: CategorialPreferenceType[] = [];

	// Perform binary search to determine correct position for decending order
	for (const currentPreference of preferences) {
		let left = 0;
		let right = sortedPreferences.length;

		while (left < right) {
			const mid = Math.floor((left + right) / 2);
			// Sort in descending order
			if (sortedPreferences[mid].frequency < currentPreference.frequency) {
				left = mid + 1;
			} else {
				right = mid;
			}
		}

		// Use unshift() to insert at the start (index 0) for a more concise operation
		sortedPreferences.splice(left, 0, currentPreference);
	}

	// Return the sorted preferences
	return sortedPreferences;
}

/**
 * Sorts a user's preferences based on their frequency in descending order.
 *
 * The algorithm works by looping through each preference in the array and
 * inserting it at the correct position in the sorted array by shifting larger
 * elements to the right.
 *
 * @param preference - The user's preferences to be sorted.
 * @returns The sorted preferences.
 * @throws Error if the input is not an array or is empty.
 */

export type userPrefType = { category: string; frequency: number };

export function insertionSort(preferences: userPrefType[]): userPrefType[] {
	// Ensure the input is a non-empty array
	if (!Array.isArray(preferences) || preferences.length === 0) {
		throw new Error('Invalid input: preferences must be a non-empty array.');
	}

	// Iterate through each preference starting from the second element
	for (let i = 1; i < preferences.length; i++) {
		const currentPreference = preferences[i];
		let j = i - 1;

		// Shift larger elements to the right
		while (j >= 0 && preferences[j].frequency < currentPreference.frequency) {
			j--;
		}

		// Only insert the current preference if it's not already in the correct position
		if (j + 1 !== i) {
			// Remove current preference and insert it at the correct position
			const [removedPreference] = preferences.splice(i, 1);
			preferences.splice(j + 1, 0, removedPreference);
		}
	}

	return preferences;
}

// const userPreference = [
// 	{ category: 'sports', frequency: 5 },
// 	{ category: 'science_technology', frequency: 3 },
// 	{ category: 'entertainment', frequency: 2 },
// 	{ category: 'health', frequency: 4 },
// 	{ category: 'politics', frequency: 1 },
// ];

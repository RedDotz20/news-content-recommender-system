import { CategorialPreferenceType } from '@/types/userPreference';

interface calcMedPerfsType {
	lowestBracket: CategorialPreferenceType[];
	median: CategorialPreferenceType[];
}

/**
 * Calculate Median Preferences
 *
 * Finds the median preference(s) based on array length rules.
 * @param {CategorialPreferenceType[]} preferences - The array of preferences from which to find the median.
 * @returns {CategorialPreferenceType[]} - The median preference(s).
 * @throws {Error} - Throws an error if the preferences array is empty or if no median candidates are found.
 *
 * Time Complexity: O(n log n) - Sorting the array of preferences takes O(n log n) time.
 * Space Complexity: O(n) - A new array is created for sortedPreferences, requiring O(n) space.
 */
export function calcMedPrefs(
	baseTarget: number,
	preferences: CategorialPreferenceType[]
): calcMedPerfsType {
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

	let lowestCandidates: CategorialPreferenceType[] = [];
	let medianCandidates: CategorialPreferenceType[] = [];

	// Determine the number of medians based on the totalPreferences count
	if (totalPreferences <= 7) {
		// Return one median
		medianCandidates.push(sortedPreferences[midIndex]);

		lowestCandidates = sortedPreferences.slice(
			0,
			sortedPreferences.indexOf(sortedPreferences[midIndex])
		);
	} else if (totalPreferences === 8) {
		// Return two medians
		medianCandidates.push(
			sortedPreferences[midIndex - 1],
			sortedPreferences[midIndex]
		);

		lowestCandidates = sortedPreferences.slice(
			0,
			sortedPreferences.indexOf(sortedPreferences[midIndex - 1])
		);
	} else if (totalPreferences >= 9 && totalPreferences <= 15) {
		// Return three medians
		medianCandidates.push(
			sortedPreferences[midIndex - 1],
			sortedPreferences[midIndex],
			sortedPreferences[midIndex + 1]
		);

		lowestCandidates = sortedPreferences.slice(
			0,
			sortedPreferences.indexOf(sortedPreferences[midIndex - 1])
		);
	} else if (totalPreferences >= 16) {
		// Return four medians
		medianCandidates.push(
			sortedPreferences[midIndex - 1],
			sortedPreferences[midIndex],
			sortedPreferences[midIndex + 1],
			sortedPreferences[midIndex + 2]
		);

		lowestCandidates = sortedPreferences.slice(
			0,
			sortedPreferences.indexOf(sortedPreferences[midIndex - 1])
		);
	}

	return {
		lowestBracket: lowestCandidates,
		median: medianCandidates,
	};
}

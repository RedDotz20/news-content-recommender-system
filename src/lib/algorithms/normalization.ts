/**
 * Normalize a user's category frequency preferences using Min-Max normalization.
 *
 * This function has a time complexity of O(n), where n is the number of preferences.
 * It iterates through the array a couple of times: once for checking non-finite values
 * and finding the minimum and maximum values, and once more for normalization.
 *
 * @param preferences - Array of category frequencies
 * @returns Array of normalized category frequencies
 * @throws Error if preferences is empty or not of length 5
 * @performance
 * Time Complexity: O(n) - where n is the number of preferences.
 * Space Complexity: O(n) - for the normalizedValues array storing the results.
 *
 */
export function normalizePreferences(preferenceValues: number[]): number[] {
	// Check if the array length is exactly 5
	if (preferenceValues.length !== 5) {
		throw new Error('Preferences array must be of length 5.');
	}

	// Initialize minimum and maximum values
	let minimumValue = Infinity;
	let maximumValue = -Infinity;

	// Validate numerical values and calculate min and max in one loop
	for (const currentValue of preferenceValues) {
		if (typeof currentValue !== 'number' || !isFinite(currentValue)) {
			throw new Error(
				'Preferences array contains non-numeric or infinite values.'
			);
		}
		if (currentValue < minimumValue) minimumValue = currentValue;
		if (currentValue > maximumValue) maximumValue = currentValue;
	}

	// If all values are the same, return an array of zeros
	if (maximumValue === minimumValue) {
		return new Array(preferenceValues.length).fill(0);
	}

	// Perform Min-Max normalization in a single pass
	const valueRange = maximumValue - minimumValue;
	const normalizedValues = new Array(preferenceValues.length);
	for (let i = 0; i < preferenceValues.length; i++) {
		normalizedValues[i] = (preferenceValues[i] - minimumValue) / valueRange;
	}

	return normalizedValues;
}

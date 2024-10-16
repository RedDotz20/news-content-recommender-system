/**
 * Validates that input arrays are non-empty arrays.
 *
 * @param userAPreferences - First input array.
 * @param userBPreferences - Second input array.
 * @throws Error if any input is not an array or if arrays are empty.
 */
export function valInputArr(
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

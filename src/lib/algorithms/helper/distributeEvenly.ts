export function distributeEvenly(total: number, length: number): number[] {
	const base = Math.floor(total / length); // Base integer value for each part
	const remainder = total % length; // Remainder to distribute

	// Create the result array, where the first 'remainder' elements get an extra 1
	return Array.from({ length }, (_, i) => base + (i < remainder ? 1 : 0));
}

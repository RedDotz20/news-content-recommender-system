import { CategorialPrefWithArticlesType } from '@/types';

/**
 * Calculate Remaining Group
 *
 * Distributes the given baseValue across the given currentGroup array.
 * It ensures that the total of the distribution equals the baseValue.
 * @param baseValue The total value to distribute.
 * @param currentGroup The array to distribute the value among.
 * @returns The updated array with the articles value filled in for each item.
 */
export function calRemaining(
	baseValue: number,
	currentGroup: Partial<CategorialPrefWithArticlesType>[]
): CategorialPrefWithArticlesType[] {
	let remainingValue = baseValue;

	// Loop until we distribute the entire baseValue
	for (let i = 0; i < currentGroup.length - 1; i++) {
		const randomIndexDestination = Math.floor(
			Math.random() * currentGroup.length
		);

		// Generate a random number that doesn't exceed the remaining value
		const randomNumber = Math.min(
			Math.floor(Math.random() * remainingValue) + 1,
			remainingValue
		);

		// Allocate the random number of articles
		if (!currentGroup[randomIndexDestination].articles) {
			currentGroup[randomIndexDestination].articles = 0;
		}
		currentGroup[randomIndexDestination].articles += randomNumber;

		// Subtract the allocated random number from the remaining value
		remainingValue -= randomNumber;
	}

	// The remaining value is added to the last item to ensure the total equals baseValue
	const lastIndex = Math.floor(Math.random() * currentGroup.length);
	if (!currentGroup[lastIndex].articles) {
		currentGroup[lastIndex].articles = 0;
	}
	currentGroup[lastIndex].articles += remainingValue;

	return currentGroup.filter(
		(item: any) => item.articles > 0
	) as CategorialPrefWithArticlesType[];
}

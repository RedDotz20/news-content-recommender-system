import { insertionSort, userPrefType } from './insertionSort';
// target: number

const userPreference = [
	{ category: 'sports', frequency: 5 },
	{ category: 'science_technology', frequency: 3 },
	{ category: 'entertainment', frequency: 2 },
	{ category: 'health', frequency: 4 },
	{ category: 'politics', frequency: 1 },
];

export function contentBased(
	inputArray: userPrefType[],
	baseTarget: number = 50
) {
	// Input validation: Ensure the input is an array of numbers
	if (
		!Array.isArray(inputArray) ||
		inputArray.some((item) => typeof item !== 'number')
	) {
		throw new Error('Input must be an array of numbers');
	}

	const sortedArray = insertionSort(inputArray);

	const topOne = sortedArray[0].category;
	const topTwo = sortedArray[1].category;
	const topThree = sortedArray[2].category;

	const fortyPercent = Math.round(baseTarget * 0.4); // top 1
	const secondThirtyPercent = Math.round(Math.floor(baseTarget * 0.3)); // top 3
	const firstThirtyPercent = baseTarget - fortyPercent - secondThirtyPercent; // top 2

	return [
		{ One: { category: topOne, articles: fortyPercent } },
		{ Two: { category: topTwo, articles: firstThirtyPercent } },
		{ Three: { category: topThree, articles: secondThirtyPercent } },
	];
}

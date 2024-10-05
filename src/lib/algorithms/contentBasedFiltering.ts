import { insertionSort } from './insertionSort';
import { percentageContentDistribution } from './percentageContentDistribution';
import {
	CategorialPreferenceType,
	TopUserCategorialArticlesType,
} from '@/types/userPreference';

/**
 * Generates content recommendations based on user preferences.
 *
 * @param inputArray - An array of user preference objects.
 * @param baseTarget - A base number for distributing the article recommendations.
 * @returns An array of recommended categories and their respective article counts.
 */

// interface ArticleRecommendation {
// 	topOne?: { category: string; articles: number };
// 	topTwo?: { category: string; articles: number };
// 	topThree?: { category: string; articles: number };
// }

export function contentBasedFiltering(
	inputArray: CategorialPreferenceType[],
	baseTarget: number = 50
): TopUserCategorialArticlesType {
	const isValidItem = (item: any) =>
		typeof item === 'object' &&
		item.category &&
		typeof item.frequency === 'number' &&
		item.frequency >= 0;

	const isValidInput =
		Array.isArray(inputArray) &&
		inputArray.length >= 3 &&
		inputArray.every(isValidItem);

	if (!isValidInput) {
		throw new Error(
			'Input must be an array of userPrefType objects with non-negative frequencies and at least three items'
		);
	}

	// Sort the input array based on user preferences
	const sortedPreferences = insertionSort(inputArray);

	// Extract top three categories from sorted preferences
	const [topCategory, secondCategory, thirdCategory] = sortedPreferences.map(
		(item) => item.category
	);

	// Calculate article count for each category based on percentage distribution
	const count = percentageContentDistribution('contentBased', baseTarget);

	return {
		topOne: { category: topCategory, articles: count.topCategoryCount },
		topTwo: { category: secondCategory, articles: count.secondCategoryCount },
		topThree: { category: thirdCategory, articles: count.thirdCategoryCount },
	};
}

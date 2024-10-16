import { insertionSort } from '../helper/insertionSort';
import { pctContentDist } from './pctContentDist';
import { calculateArticleValues } from './calcArticleVal';
import { CategorialPreferenceType } from '@/types';
import { ArticlesValueInterface } from '@/types/algorithmTypes';

/**
 * Generates content recommendations based on user preferences.
 *
 * @param inputArray - An array of user preference objects.
 * @param baseTarget - A base number for distributing the article recommendations.
 * @returns An array of recommended categories and their respective article counts.
 */

export function contentBasedFiltering(
	inputArray: CategorialPreferenceType[],
	baseTarget: number = 50
): ArticlesValueInterface {
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

	// Reduce the base target by 70%
	const reducedBaseTarget = baseTarget * 0.7;

	const calculateHalflength = (): number => {
		if (sortedPreferences.length < 3) {
			const errorMessage =
				'The sortedPreferences array must have at least three items.';
			throw new Error(errorMessage);
		}

		return sortedPreferences.length <= 6
			? -1 // return whole array
			: Math.floor(sortedPreferences.length / 2);
	};

	const halfLength = calculateHalflength();

	// Extract the top 50% of the sorted array
	const reducedCategoryLength = sortedPreferences.slice(
		0,
		halfLength as number
	);

	const distributedArticles = pctContentDist(
		'articleDistribution',
		reducedBaseTarget
	);

	const distributedCategories = pctContentDist(
		'categoryIdentifier',
		reducedCategoryLength.length
	);

	return calculateArticleValues(
		reducedCategoryLength,
		distributedArticles,
		distributedCategories
	);
}

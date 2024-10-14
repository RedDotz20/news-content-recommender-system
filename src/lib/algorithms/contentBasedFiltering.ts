import { insertionSort } from './insertionSort';
import { percentageContentDistribution } from './percentageContentDistribution';
import {
	CategorialCountType,
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

export function contentBasedFiltering(
	inputArray: CategorialPreferenceType[],
	baseTarget: number = 50
): any {
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

	const calculateHalflength = (): number | null => {
		if (sortedPreferences.length <= 6 && sortedPreferences.length >= 3) {
			return -1;
		} else if (sortedPreferences.length > 6) {
			return Math.floor(sortedPreferences.length / 2);
		} else {
			return null;
		}
	};

	const halfLength = calculateHalflength();

	// Extract the top 50% of the sorted array
	const reducedCategoryLength = sortedPreferences.slice(
		0,
		halfLength as number
	);

	const distributedArticles = percentageContentDistribution(
		'articleDistribution',
		reducedBaseTarget
	);

	const distributedCategories = percentageContentDistribution(
		'categoryIdentifier',
		reducedCategoryLength.length
	);

	return calculateArticleValues(
		reducedCategoryLength,
		distributedArticles,
		distributedCategories
	);
}

function distributeEvenly(total: number, length: number): number[] {
	const base = Math.floor(total / length); // Base integer value for each part
	const remainder = total % length; // Remainder to distribute

	// Create the result array, where the first 'remainder' elements get an extra 1
	return Array.from({ length }, (_, i) => base + (i < remainder ? 1 : 0));
}

interface GroupDistributionType {
	firstGroupVal: number;
	secondGroupVal: number;
	thirdGroupVal: number;
}

function calculateArticleValues(
	topPreferences: CategorialPreferenceType[],
	distributedArticles: GroupDistributionType,
	distributedCategories: GroupDistributionType
): {
	categoryFirstGroup: CategorialPreferenceType[];
	categorySecondGroup: CategorialPreferenceType[];
	filteredCategoryThirdGroup: CategorialPreferenceType[];
} {
	const categoryFirstGroup = topPreferences.slice(
		0,
		distributedCategories.firstGroupVal
	);
	const categorySecondGroup = topPreferences.slice(
		distributedCategories.firstGroupVal,
		distributedCategories.firstGroupVal + distributedCategories.secondGroupVal
	);
	const categoryThirdGroup = topPreferences.slice(
		-distributedCategories.thirdGroupVal
	);

	const firstDistCount = distributeEvenly(
		distributedArticles.firstGroupVal,
		categoryFirstGroup.length
	);
	const secondDistCount = distributeEvenly(
		distributedArticles.secondGroupVal,
		categorySecondGroup.length
	);

	// first group
	for (let i = 0; i < categoryFirstGroup.length; i++) {
		categoryFirstGroup[i].articles = firstDistCount[i];
	}

	// second group
	for (let i = 0; i < categorySecondGroup.length; i++) {
		categorySecondGroup[i].articles = secondDistCount[i];
	}


	function calculateThirdGroup(
		baseValue: number = distributedArticles.thirdGroupVal
	): void {
		// Base case: if baseValue is 0, stop the recursion.
		if (baseValue <= 0) {
			// console.log("Base value has reached zero.");
			return;
		}

		// Generate a random number between 0 and third category length
		const randomIndexDestination = Math.floor(
			Math.random() * categoryThirdGroup.length
		);

		// Generate a random number between 0 and the current baseValue.
		const randomNumber = Math.floor(Math.random() * (baseValue + 1));

		categoryThirdGroup[randomIndexDestination].articles = randomNumber;

		// Recur with the new baseValue after subtraction.
		calculateThirdGroup(baseValue - randomNumber);
	}

	calculateThirdGroup();

	const filteredCategoryThirdGroup = categoryThirdGroup.filter(
		(item) => 'articles' in item && item.articles! > 0
	);

	return {
		categoryFirstGroup,
		categorySecondGroup,
		filteredCategoryThirdGroup,
	};
}

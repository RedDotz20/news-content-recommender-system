/**
 * Calculates the distribution of articles across three categories based on a given distribution type.
 *
 * @param {('contentBased' | 'Overall')} distributionType - The type of distribution to use.
 * Must be either "contentBased" or "Overall".
 * @param {number} [baseTarget=50] - The base target number of articles to distribute.
 * It must be a non-negative number. Defaults to 50.
 * @returns {PercentageDistributionResults} The distribution results containing counts for the top, second, and third categories.
 * @throws {Error} If `baseTarget` is negative or if `distributionType` is not valid.
 */

interface PercentageDistributionResults {
	topCategoryCount: number;
	secondCategoryCount: number;
	thirdCategoryCount: number;
}

export function percentageContentDistribution(
	distributionType: 'contentBased' | 'Overall' = 'contentBased',
	baseTarget: number = 50
): PercentageDistributionResults {
	// Validate baseTarget to ensure it is non-negative
	if (baseTarget < 0) {
		throw new Error('baseTarget must be a non-negative number');
	}

	const distributions: Record<string, number[]> = {
		contentBased: [0.4, 0.3, 0.3],
		Overall: [0.7, 0.2, 0.1],
	};

	// Validate distributionType and retrieve percentages
	const percentage = distributions[distributionType];

	if (!percentage) {
		throw new Error(
			'Invalid distributionType. Must be "contentBased" or "Overall".'
		);
	}

	// Calculate the articles for each category based on percentages
	const articlesForTopCategory = Math.round(baseTarget * percentage[0]);
	const articlesForThirdCategory = Math.round(baseTarget * percentage[2]);
	let articlesForSecondCategory =
		baseTarget - articlesForTopCategory - articlesForThirdCategory;

	// Ensure articles for the second category are non-negative
	if (articlesForSecondCategory < 0) {
		articlesForSecondCategory = 0; // Set to 0 if negative
	}

	// Correct the distributions if they do not sum to baseTarget
	const totalCount =
		articlesForTopCategory +
		articlesForSecondCategory +
		articlesForThirdCategory;

	if (totalCount !== baseTarget) {
		articlesForSecondCategory += baseTarget - totalCount; // Adjust second category count
	}

	return {
		topCategoryCount: articlesForTopCategory,
		secondCategoryCount: articlesForSecondCategory,
		thirdCategoryCount: articlesForThirdCategory,
	};
}

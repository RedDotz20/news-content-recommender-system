import { GroupDistributionType } from '@/types';

/**
 * Percentage Content Distribution
 *
 * Calculates the distribution of articles across three categories based on a given distribution type.
 *
 * @param {('contentBased' | 'Overall')} distributionType - The type of distribution to use.
 * Must be either "contentBased" or "Overall".
 * @param {number} [baseTarget=50] - The base target number of articles to distribute.
 * It must be a non-negative number. Defaults to 50.
 * @returns {PercentageDistributionResults} The distribution results containing counts for the top, second, and third categories.
 * @throws {Error} If `baseTarget` is negative or if `distributionType` is not valid.
 */

type distType = 'articleDistribution' | 'categoryIdentifier';

export function pctContentDist(
  distributionType: distType,
  baseTarget: number = 50
): GroupDistributionType {
  // Validate baseTarget to ensure it is non-negative
  if (baseTarget < 0) {
    throw new Error('baseTarget must be a non-negative number');
  }

  const distributions: Record<string, number[]> = {
    articleDistribution: [0.6, 0.3, 0.1],
    categoryIdentifier: [0.3, 0.3, 0.4]
  };

  // Validate distributionType and retrieve percentages
  const percentage = distributions[distributionType];

  if (!percentage) {
    throw new Error('Invalid distributionType. Must be "contentBased" or "Overall".');
  }

  const firstListGroup = Math.round(baseTarget * percentage[0]);
  const thridListGroup = Math.round(baseTarget * percentage[2]);
  // Calculate the articles for each category based on percentages
  let secondListGroup = baseTarget - firstListGroup - thridListGroup;

  // Ensure articles for the second category are non-negative
  if (secondListGroup < 0) {
    secondListGroup = 0; // Set to 0 if negative
  }

  // Correct the distributions if they do not sum to baseTarget
  const totalCount = firstListGroup + secondListGroup + thridListGroup;

  if (totalCount !== baseTarget) {
    secondListGroup += baseTarget - totalCount; // Adjust second category count
  }

  return {
    firstGroupVal: firstListGroup,
    secondGroupVal: secondListGroup,
    thirdGroupVal: thridListGroup
  };
}

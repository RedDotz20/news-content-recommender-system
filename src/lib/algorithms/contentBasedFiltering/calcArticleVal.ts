import { distributeEvenly } from '../helper/distributeEvenly';
import { calRemaining } from '../helper/calRemaining';
import { CategorialPreferenceType, GroupDistributionType } from '@/types';
import { ArticlesValueInterface } from '@/types/algorithmTypes';

export function calculateArticleValues(
  relevantPreferences: CategorialPreferenceType[],
  distributedArticles: GroupDistributionType,
  distributedCategories: GroupDistributionType
): ArticlesValueInterface {
  // Ensure the groups meet the necessary conditions to prevent errors
  if (relevantPreferences.length === 0) {
    throw new Error('Top preferences must not be empty.');
  }

  if (
    distributedCategories.firstGroupVal < 0 ||
    distributedCategories.secondGroupVal < 0 ||
    distributedCategories.thirdGroupVal < 0
  ) {
    throw new Error('Distribution values cannot be negative.');
  }

  // Slice preferences into groups based on distribution categories
  const firstGroupPreferences = relevantPreferences.slice(0, distributedCategories.firstGroupVal);

  const secondGroupPreferences = relevantPreferences.slice(
    distributedCategories.firstGroupVal,
    distributedCategories.firstGroupVal + distributedCategories.secondGroupVal
  );

  const thirdGroupPreferences = relevantPreferences.slice(-distributedCategories.thirdGroupVal);

  // Distribute articles evenly across the first and second groups
  const firstGroupArticleDistribution = distributeEvenly(
    distributedArticles.firstGroupVal,
    firstGroupPreferences.length
  );

  const secondGroupArticleDistribution = distributeEvenly(
    distributedArticles.secondGroupVal,
    secondGroupPreferences.length
  );

  // Update the first group preferences with the distributed articles count
  const updatedFirstGroup = firstGroupPreferences.map((category, index) => {
    return { ...category, articles: firstGroupArticleDistribution[index] };
  });

  // Update the second group preferences with the distributed articles count
  const updatedSecondGroup = secondGroupPreferences.map((category, index) => {
    return { ...category, articles: secondGroupArticleDistribution[index] };
  });

  // Calculate remaining articles for the third group
  const finalThirdGroup = calRemaining(distributedArticles.thirdGroupVal, [
    ...thirdGroupPreferences
  ]);

  // Return the organized groups with their article counts
  return {
    firstGroup: updatedFirstGroup,
    secondGroup: updatedSecondGroup,
    thirdGroup: finalThirdGroup
  };
}

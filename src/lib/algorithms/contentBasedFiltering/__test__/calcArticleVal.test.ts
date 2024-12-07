import { calculateArticleValues } from '@/lib/algorithms/contentBasedFiltering/calcArticleVal';
import { CategorialPreferenceType, GroupDistributionType } from '@/types';

describe('calculateArticleValues', () => {
	it('should throw an error when relevantPreferences is empty', () => {
		const relevantPreferences: CategorialPreferenceType[] = [];
		const distributedArticles: GroupDistributionType = {
			firstGroupVal: 1,
			secondGroupVal: 1,
			thirdGroupVal: 1,
		};
		const distributedCategories: GroupDistributionType = {
			firstGroupVal: 1,
			secondGroupVal: 1,
			thirdGroupVal: 1,
		};

		expect(() =>
			calculateArticleValues(
				relevantPreferences,
				distributedArticles,
				distributedCategories
			)
		).toThrow('Top preferences must not be empty.');
	});

	it('should not throw an error when relevantPreferences is not empty', () => {
		const relevantPreferences: CategorialPreferenceType[] = [
			{ category: 'news', frequency: 5 },
		];
		const distributedArticles: GroupDistributionType = {
			firstGroupVal: 1,
			secondGroupVal: 1,
			thirdGroupVal: 1,
		};
		const distributedCategories: GroupDistributionType = {
			firstGroupVal: 1,
			secondGroupVal: 1,
			thirdGroupVal: 1,
		};

		expect(() =>
			calculateArticleValues(
				relevantPreferences,
				distributedArticles,
				distributedCategories
			)
		).not.toThrow();
	});
});

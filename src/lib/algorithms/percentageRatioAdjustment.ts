import { TopUserCategorialArticlesType } from '@/types/userPreference';

/**
 * Adjusts the article counts in the provided categories to reach a target total,
 * given as a percentage of the base total.
 *
 * @param categories - An object with three optional properties: `topOne`, `topTwo`, and `topThree`.
 *  Each property is an object with two properties: `category` (string) and `articles` (number).
 * @param targetPercentage - The target percentage as a number between 0 and 100. Defaults to 70.
 * @returns An array of objects with two properties each: `category` (string) and `articles` (number).
 *  The array is sorted in descending order by the number of articles.
 */

export function percentageRatioAdjustment(
	categories: TopUserCategorialArticlesType,
	targetPercentage: number = 70
): TopUserCategorialArticlesType[] {
	// Calculate the total number of articles from the provided data
	const baseValue =
		(categories.topOne?.articles ?? 0) +
		(categories.topTwo?.articles ?? 0) +
		(categories.topThree?.articles ?? 0);

	// Handle case where baseValue is 0 to avoid division by zero
	if (baseValue === 0) {
		return []; // or return based on desired default behavior
	}

	// Calculate the target total based on the percentage of the base value
	const targetTotal = Math.round(baseValue * (targetPercentage / 100));

	// Get the current article counts directly from the categories
	const articleCounts = [
		{
			category: categories.topOne?.category,
			articles: categories.topOne?.articles ?? 0,
		},
		{
			category: categories.topTwo?.category,
			articles: categories.topTwo?.articles ?? 0,
		},
		{
			category: categories.topThree?.category,
			articles: categories.topThree?.articles ?? 0,
		},
	].filter((item) => item.category); // Filter out undefined categories

	// Calculate the scaling factor to adjust the counts
	const scalingFactor = targetTotal / baseValue;

	// Scale articles for each category
	articleCounts.forEach((item) => {
		item.articles = Math.round(item.articles * scalingFactor);
	});

	// Adjust the counts to ensure we hit the exact targetTotal
	const adjustedTotal = articleCounts.reduce(
		(sum, item) => sum + item.articles,
		0
	);

	if (adjustedTotal > targetTotal) {
		const excess = adjustedTotal - targetTotal;
		articleCounts[2]!.articles = Math.max(
			0,
			articleCounts[2]!.articles - excess
		); // Adjust third category if excess
	} else if (adjustedTotal < targetTotal) {
		const deficit = targetTotal - adjustedTotal;
		articleCounts[1]!.articles += deficit; // Increase second category if needed
	}

	// Sort the result by the number of articles in descending order

	return articleCounts.sort(
		(a, b) => b.articles - a.articles
	) as TopUserCategorialArticlesType[];
}

// Example Usage
// const articleRecommendation: ArticleRecommendation = {
// 	topOne: { category: 'Technology', articles: 20 },
// 	topTwo: { category: 'Science', articles: 15 },
// 	topThree: { category: 'Health', articles: 15 },
// };

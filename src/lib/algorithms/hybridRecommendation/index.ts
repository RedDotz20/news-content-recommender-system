import { contentBasedFiltering } from '../contentBasedFiltering';
import { collaborativeFiltering } from '../collaborativeFiltering';
import { calcMedianPreference } from './calcMedianPreference';
import {
	CategorialCountType,
	CategorialPrefWithArticlesType,
	LowerAndMedianPrefsType,
	UserPreferenceType,
} from '@/types';
import { calRemaining } from '../helper';
import { medDist } from './medDist';

export function hybridRecommendation(
	baseTarget: number,
	targetUserPreferences: UserPreferenceType,
	otherUserPreferences: UserPreferenceType[]
) {
	const targetUserCategorialPref = targetUserPreferences.preferences;

	const contentBasedFiltered: ReturnType<typeof contentBasedFiltering> =
		contentBasedFiltering(targetUserCategorialPref, baseTarget);

	const collaborativeFiltered: ReturnType<typeof collaborativeFiltering> =
		collaborativeFiltering(targetUserPreferences, otherUserPreferences);

	const collabFilteredMed = collaborativeFiltered.mostSimilarUser?.preferences;

	if (collabFilteredMed) {
		const collaborativeMedian: LowerAndMedianPrefsType = calcMedianPreference(
			0.3,
			collabFilteredMed
		);

		const collabMedian = medDist(baseTarget, collaborativeMedian.median);

		const collabLowBracket = calRemaining(
			baseTarget * 0.1,
			collaborativeMedian.lowestBracket
		);

		const mergedArticles = [
			contentBasedFiltered.firstGroup as CategorialPrefWithArticlesType[],
			contentBasedFiltered.secondGroup as CategorialPrefWithArticlesType[],
			contentBasedFiltered.thirdGroup as CategorialPrefWithArticlesType[],
			collabMedian as CategorialPrefWithArticlesType[],
			collabLowBracket as CategorialPrefWithArticlesType[],
		].flat();

		// distribute the number of articles evenly
		// Calculate total articles
		const totalArticles = mergedArticles.reduce(
			(sum, curr) => sum + curr.articles,
			0
		);

		// Determine the scaling factor to allocate articles evenly
		const scalingFactor = baseTarget / totalArticles;

		// Distribute articles evenly in accordance with the scaling factor
		const distributedArticles = mergedArticles.map((article) => ({
			category: article.category,
			articles: Math.floor(article.articles * scalingFactor), // Ensure each count is an integer
		}));

		// Calculate the sum after distribution
		let currentTotal = distributedArticles.reduce(
			(sum, curr) => sum + curr.articles,
			0
		);

		// If the current total is less than baseTarget, we need to adjust some articles
		if (currentTotal < baseTarget) {
			let deficit = baseTarget - currentTotal;

			// Sort by the original count to prioritize categories that can take more articles
			distributedArticles.sort((a, b) => b.articles - a.articles);

			for (let i = 0; i < distributedArticles.length && deficit > 0; i++) {
				// eslint-disable-next-line no-unused-vars
				let current = distributedArticles[i];
				// Increase articles by 1 each time until we meet baseTarget
				distributedArticles[i].articles += 1;
				deficit -= 1;
			}
		}

		// Prepare the final recommended articles list
		const hybridRecommendedArticles: CategorialCountType[] =
			distributedArticles.reduce((acc: CategorialCountType[], curr) => {
				const existingCategory = acc.find(
					(item) => item.category === curr.category
				);

				if (existingCategory) {
					existingCategory.articles += curr.articles;
				} else {
					acc.push({ category: curr.category, articles: curr.articles });
				}

				return acc;
			}, []);

		return hybridRecommendedArticles;
	}
}
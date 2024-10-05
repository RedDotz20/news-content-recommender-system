import { calculateMedianPreference } from './calculateMedianPreference';
import { collaborativeFiltering } from './collaborativeFiltering';
import { contentBasedFiltering } from './contentBasedFiltering';
import { percentageRatioAdjustment } from './percentageRatioAdjustment';
import {
	CategorialPreferenceType,
	TopUserCategorialArticlesType,
} from '@/types/userPreference';

// FUNCTION TO LOOP TOP NEIGHBORHOOD CATEGORIAL ARTICLES SIMILAR TO YOURS
// RETURN 5 COSINE SIMILARITY THEN PICK HIGHEST VALUE

// TODO: TEST IN API
export function recommendedArticles(
	baseTarget: number = 50,
	userCategorialPreferences: CategorialPreferenceType[],
	relatedCategorialPreferences: CategorialPreferenceType[]
) {
	// 40:30:30 ratio
	// perform content based filtering based on user preferences w/ base target
	const userPreferencesArticles: TopUserCategorialArticlesType =
		contentBasedFiltering(userCategorialPreferences, baseTarget);

	// adjust the 40:30:30 ratio to 70% of base target
	const adjustedArticleRatio: TopUserCategorialArticlesType[] =
		percentageRatioAdjustment(userPreferencesArticles);

	// 20 + 10 PERCENT

	let articles: TopUserCategorialArticlesType[] = [];

	// articles.push([...adjustedArticleRatio])

	adjustedArticleRatio.forEach((item: TopUserCategorialArticlesType, index) => {
		articles.push(item);
	});

	// calculate the median preference of the other related preferences
	const relatedCategorialMedianPreference: CategorialPreferenceType =
		calculateMedianPreference(relatedCategorialPreferences);
}

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

	//*
	const contentBasedFiltered: ReturnType<typeof contentBasedFiltering> =
		contentBasedFiltering(targetUserCategorialPref, baseTarget);
	//*

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

		// TODO: implement distribute evenly with articles

		const hybridRecommendedArticles: CategorialCountType[] =
			mergedArticles.reduce((acc: CategorialCountType[], curr) => {
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

import {
	CategorialPreferenceType,
	CategorialPrefWithArticlesType,
} from './userPreference';

export interface GroupDistributionType {
	firstGroupVal: number;
	secondGroupVal: number;
	thirdGroupVal: number;
}

export interface calcMedPerfsType {
	lowestBracket: CategorialPreferenceType[];
	median: CategorialPreferenceType[];
}

export interface ArticlesValueInterface {
	firstGroup: CategorialPrefWithArticlesType[];
	secondGroup: CategorialPrefWithArticlesType[];
	thirdGroup: CategorialPrefWithArticlesType[];
}

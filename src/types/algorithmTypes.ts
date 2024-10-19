import {
	CategorialPreferenceType,
	CategorialPrefWithArticlesType,
	UserPreferenceType,
} from './userPreference';

export interface GroupDistributionType {
	firstGroupVal: number;
	secondGroupVal: number;
	thirdGroupVal: number;
}

export interface LowerAndMedianPrefsType {
	lowestBracket: CategorialPreferenceType[];
	median: CategorialPreferenceType[];
}
export interface PreferenceVectorType {
	[key: string]: number;
}

export interface ArticlesValueInterface {
	firstGroup: CategorialPrefWithArticlesType[];
	secondGroup: CategorialPrefWithArticlesType[];
	thirdGroup: CategorialPrefWithArticlesType[];
}

export type MostSimilarType = UserPreferenceType | null;

export type OtherSimilarType = Array<{
	userId: string;
	similarity: number;
}>;

export interface CollaborativeResults {
	mostSimilarUser: MostSimilarType;
	otherSimilarities: OtherSimilarType;
}

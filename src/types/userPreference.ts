export interface CategorialPreferenceType {
	category: string;
	frequency: number;
}

export interface CategorialPrefWithArticlesType
	extends CategorialPreferenceType {
	articles: number;
}

export type CategorialCountType = Pick<
	CategorialPrefWithArticlesType,
	'category' | 'articles'
>;

export interface UserPreferenceType {
	userId: string;
	preferences: CategorialPreferenceType[];
}

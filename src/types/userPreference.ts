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

export interface TopUserCategorialArticlesType {
	topOne?: { category: string; articles: number };
	topTwo?: { category: string; articles: number };
	topThree?: { category: string; articles: number };
}

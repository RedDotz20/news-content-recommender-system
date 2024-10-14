export interface CategorialPreferenceType {
	category: string;
	frequency: number;
	articles?: number;
}

export interface CategorialCountType {
	category: string;
	articles: number;
}

export interface TopUserCategorialArticlesType {
	topOne?: { category: string; articles: number };
	topTwo?: { category: string; articles: number };
	topThree?: { category: string; articles: number };
}

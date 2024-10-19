import { CategorialPreferenceType, PreferenceVectorType } from '@/types';

export function transformPrefsToVector(
	preferences: CategorialPreferenceType[]
): PreferenceVectorType {
	if (!Array.isArray(preferences)) {
		throw new Error('Invalid input: preferences must be an array');
	}

	const categoryMap: PreferenceVectorType = {};

	for (const pref of preferences) {
		if (pref.category && typeof pref.frequency === 'number') {
			categoryMap[pref.category] = pref.frequency;
		} else {
			console.warn(`Invalid preference item: ${JSON.stringify(pref)}`);
		}
	}

	return categoryMap;
}

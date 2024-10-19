import { CategorialPrefWithArticlesType } from '@/types';
import { distributeEvenly } from '../helper/distributeEvenly';

export function medDist(
	baseTarget: number,
	medianArr: Partial<CategorialPrefWithArticlesType>[]
): Partial<CategorialPrefWithArticlesType>[] {
	const reducedBasedTarget = baseTarget * 0.2;
	const medianLen = medianArr.length;

	const distributedMed = distributeEvenly(reducedBasedTarget, medianLen);

	for (let i = 0; i < medianLen; i++) {
		medianArr[i].articles = distributedMed[i];
	}

	return medianArr;
}

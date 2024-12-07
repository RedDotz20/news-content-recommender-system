import { medDist } from '@/lib/algorithms/hybridRecommendation/medDist';
import { CategorialPrefWithArticlesType } from '@/types';

jest.mock('@/lib/algorithms/helper/distributeEvenly', () => ({
	distributeEvenly: jest.fn(),
}));

const { distributeEvenly } = require('../helper/distributeEvenly');

describe('medDist', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('happy path', () => {
		const baseTarget = 100;
		const medianArr: Partial<CategorialPrefWithArticlesType>[] = [
			{ articles: 0 },
			{ articles: 0 },
			{ articles: 0 },
		];

		distributeEvenly.mockReturnValue([10, 10, 10]);

		const result = medDist(baseTarget, medianArr);

		expect(distributeEvenly).toHaveBeenCalledWith(20, 3);
		expect(result).toEqual([
			{ articles: 10 },
			{ articles: 10 },
			{ articles: 10 },
		]);
	});

	test('edge case: empty median array', () => {
		const baseTarget = 100;
		const medianArr: Partial<CategorialPrefWithArticlesType>[] = [];

		distributeEvenly.mockReturnValue([]);

		const result = medDist(baseTarget, medianArr);

		expect(distributeEvenly).toHaveBeenCalledWith(20, 0);
		expect(result).toEqual([]);
	});

	test('edge case: negative base target', () => {
		const baseTarget = -100;
		const medianArr: Partial<CategorialPrefWithArticlesType>[] = [
			{ articles: 0 },
			{ articles: 0 },
		];

		distributeEvenly.mockReturnValue([-10, -10]);

		const result = medDist(baseTarget, medianArr);

		expect(distributeEvenly).toHaveBeenCalledWith(-20, 2);
		expect(result).toEqual([{ articles: -10 }, { articles: -10 }]);
	});

	test('edge case: single element in median array', () => {
		const baseTarget = 50;
		const medianArr: Partial<CategorialPrefWithArticlesType>[] = [
			{ articles: 0 },
		];

		distributeEvenly.mockReturnValue([10]);

		const result = medDist(baseTarget, medianArr);

		expect(distributeEvenly).toHaveBeenCalledWith(10, 1);
		expect(result).toEqual([{ articles: 10 }]);
	});
});

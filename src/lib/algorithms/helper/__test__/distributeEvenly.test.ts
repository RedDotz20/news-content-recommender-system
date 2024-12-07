import { distributeEvenly } from '@/lib/algorithms/helper/distributeEvenly';

describe('distributeEvenly', () => {
	// Happy path
	it('should distribute 10 evenly into 3 parts', () => {
		expect(distributeEvenly(10, 3)).toEqual([4, 3, 3]);
	});

	it('should distribute 5 evenly into 2 parts', () => {
		expect(distributeEvenly(5, 2)).toEqual([3, 2]);
	});

	it('should distribute 0 into 3 parts', () => {
		expect(distributeEvenly(0, 3)).toEqual([0, 0, 0]);
	});

	// Edge cases
	it('should return empty array when length is 0', () => {
		expect(distributeEvenly(10, 0)).toEqual([]);
	});

	it('should handle negative total', () => {
		expect(distributeEvenly(-5, 3)).toEqual([-2, -2, -1]);
	});

	it('should handle total less than length', () => {
		expect(distributeEvenly(2, 5)).toEqual([1, 1, 0, 0, 0]);
	});

	it('should make sure that if total is equal to length, it returns an array of 1s', () => {
		expect(distributeEvenly(3, 3)).toEqual([1, 1, 1]);
	});

	it('should handle large numbers', () => {
		expect(distributeEvenly(1000000, 3)).toEqual([333334, 333333, 333333]);
	});
});

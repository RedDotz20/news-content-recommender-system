import { calculateCosineSimilarity } from '../collaborativeFiltering';

describe('calculateCosineSimilarity', () => {
	test('should calculate cosine similarity correctly for typical input', () => {
		const userOnePref = [4, 2, 3, 5, 1];
		const userTwoPref = [3, 3, 4, 2, 5];
		const result = calculateCosineSimilarity(userOnePref, userTwoPref);
		expect(result).toBeCloseTo(0.928, 3);
	});

	test('should return NaN when both users have zero preferences', () => {
		const userOnePref = [0, 0, 0, 0, 0];
		const userTwoPref = [0, 0, 0, 0, 0];
		const result = calculateCosineSimilarity(userOnePref, userTwoPref);
		expect(result).toBeNaN();
	});

	test('should return NaN when one user has zero preferences', () => {
		const userOnePref = [1, 2, 3, 4, 5];
		const userTwoPref = [0, 0, 0, 0, 0];
		const result = calculateCosineSimilarity(userOnePref, userTwoPref);
		expect(result).toBeNaN();
	});

	// test('should return -1 for completely opposite preferences', () => {
	// 	const userOnePref = [1, 1, 1, 1, 1];
	// 	const userTwoPref = [-1, -1, -1, -1, -1];
	// 	const result = calculateCosineSimilarity(userOnePref, userTwoPref);
	// 	expect(result).toBe(-1);
	// });

	test('should calculate cosine similarity for single element arrays', () => {
		const userOnePref = [1];
		const userTwoPref = [0];
		const result = calculateCosineSimilarity(userOnePref, userTwoPref);
		expect(result).toBe(0);
	});

	test('should throw an error when arrays have different lengths', () => {
		const userOnePref = [1, 2, 3];
		const userTwoPref = [1, 2];
		expect(() => calculateCosineSimilarity(userOnePref, userTwoPref)).toThrow(
			'Array lengths must be equal'
		);
	});
});

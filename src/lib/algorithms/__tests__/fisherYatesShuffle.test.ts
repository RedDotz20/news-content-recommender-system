import { fisherYatesShuffle } from '../fisherYatesShuffle';

describe('fisherYatesShuffle', () => {
	// Happy path test case
	it('should shuffle an array of numbers', () => {
		const input = [1, 2, 3, 4, 5];
		const result = fisherYatesShuffle(input);

		expect(result).toHaveLength(input.length);
		expect(result).not.toEqual(input);
		expect(result.sort()).toEqual(input.sort()); // Check if it contains the same elements
	});

	// Edge cases
	it('should throw an error for an empty array', () => {
		expect(() => fisherYatesShuffle([])).toThrowError(
			'Input must be a non-empty array of numbers.'
		);
	});

	it('should throw an error for non-array input', () => {
		expect(() => fisherYatesShuffle(<any>null)).toThrowError(
			'Input must be a non-empty array of numbers.'
		);
		expect(() => fisherYatesShuffle(<any>123)).toThrowError(
			'Input must be a non-empty array of numbers.'
		);
		expect(() => fisherYatesShuffle(<any>'string')).toThrowError(
			'Input must be a non-empty array of numbers.'
		);
	});

	it('should throw an error for an array with non-number elements', () => {
		// @ts-ignore
		expect(() => fisherYatesShuffle([1, 2, 'three'])).toThrowError(
			'Input must be a non-empty array of numbers.'
		);
		// @ts-ignore
		expect(() => fisherYatesShuffle([1, 2, null])).toThrowError(
			'Input must be a non-empty array of numbers.'
		);
	});

	it('should correctly shuffle an array with a single element', () => {
		const input = [42];
		const result = fisherYatesShuffle(input);
		expect(result).toEqual(input); // Same element should return the same array
	});
});

describe('fisherYatesShuffle performance', () => {
	it('should perform well with large arrays', () => {
		const input = Array.from({ length: 1000000 }, (_, i) => i + 1); // Create an array of 1,000,000 numbers
		const startTime = performance.now();

		fisherYatesShuffle(input);

		const endTime = performance.now();
		const duration = endTime - startTime;

		console.log(`Performance test completed in ${duration} milliseconds`);

		// Expect it to complete within a reasonable time frame (e.g., 100 ms)
		expect(duration).toBeLessThan(100);
	});
});

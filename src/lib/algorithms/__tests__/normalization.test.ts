import { normalizePreferences } from '../normalization';

describe('normalizePreferences', () => {
	// Happy path test case
	it('should normalize the preferences correctly', () => {
		const preferences = [10, 20, 30, 40, 50];
		const expected = [0, 0.25, 0.5, 0.75, 1];
		expect(normalizePreferences(preferences)).toEqual(expected);
	});

	// Edge case: all values are the same
	it('should return an array of zeros when all preferences are the same', () => {
		const preferences = [5, 5, 5, 5, 5];
		const expected = [0, 0, 0, 0, 0];
		expect(normalizePreferences(preferences)).toEqual(expected);
	});

	// Edge case: minimum length not met
	it('should throw an error if preferences array length is not 5', () => {
		const preferences = [10, 20, 30];
		expect(() => normalizePreferences(preferences)).toThrow(
			'Preferences array must be of length 5.'
		);
	});

	// Edge case: contains non-numeric values
	it('should throw an error if preferences array contains non-numeric values', () => {
		const preferences = [10, 20, '30', 40, 50];
		// @ts-ignore
		expect(() => normalizePreferences(preferences)).toThrow(
			'Preferences array contains non-numeric or infinite values.'
		);
	});

	// Edge case: contains infinite values
	it('should throw an error if preferences array contains infinite values', () => {
		const preferences = [10, 20, Infinity, 40, 50];
		expect(() => normalizePreferences(preferences)).toThrow(
			'Preferences array contains non-numeric or infinite values.'
		);
	});

	// Edge case: contains NaN values
	it('should throw an error if preferences array contains NaN values', () => {
		const preferences = [10, 20, NaN, 40, 50];
		expect(() => normalizePreferences(preferences)).toThrow(
			'Preferences array contains non-numeric or infinite values.'
		);
	});
});

describe('normalizePreferences performance', () => {
	// Performance test for normalizePreferences
	it('should normalize preferences efficiently', () => {
		const preferences = Array.from({ length: 5 }, (_, i) => i);
		const startTime = performance.now();

		normalizePreferences(preferences);

		const endTime = performance.now();
		const duration = endTime - startTime;

		console.log(`Performance test duration: ${duration} milliseconds`);
		expect(duration).toBeLessThan(500); // Adjust this threshold as needed
	});
});

import { transformPrefsToVector } from '@/lib/algorithms/collaborativeFiltering/transformPrefToVector';
import { CategorialPreferenceType, PreferenceVectorType } from '@/types';

describe('transformPrefsToVector', () => {
	// Happy Path
	it('should transform valid preferences to a preference vector', () => {
		const preferences: CategorialPreferenceType[] = [
			{ category: 'Sports', frequency: 5 },
			{ category: 'Music', frequency: 3 },
		];
		const expected: PreferenceVectorType = {
			Sports: 5,
			Music: 3,
		};

		expect(transformPrefsToVector(preferences)).toEqual(expected);
	});

	// Edge Cases
	it('should throw an error for non-array input', () => {
		// @ts-expect-error
		expect(() => transformPrefsToVector(null)).toThrow(
			'Invalid input: preferences must be an array'
		);
		// @ts-expect-error
		expect(() => transformPrefsToVector(undefined)).toThrow(
			'Invalid input: preferences must be an array'
		);
		// @ts-expect-error
		expect(() => transformPrefsToVector({})).toThrow(
			'Invalid input: preferences must be an array'
		);
		// @ts-expect-error
		expect(() => transformPrefsToVector('string')).toThrow(
			'Invalid input: preferences must be an array'
		);
	});

	it('should ignore preferences with missing category or frequency', () => {
		const preferences: CategorialPreferenceType[] = [
			{ category: 'Sports', frequency: 5 },
			// @ts-expect-error
			{ frequency: 3 }, // missing category
			// @ts-expect-error
			{ category: 'Music' }, // missing frequency
			{ category: 'Art', frequency: 4 },
		];
		const expected: PreferenceVectorType = {
			Sports: 5,
			Art: 4,
		};

		console.warn = jest.fn(); // mock console.warn
		expect(transformPrefsToVector(preferences)).toEqual(expected);
		expect(console.warn).toHaveBeenCalledTimes(2); // two invalid items
	});

	it('should return an empty object for an empty preferences array', () => {
		const preferences: CategorialPreferenceType[] = [];
		const expected: PreferenceVectorType = {};

		expect(transformPrefsToVector(preferences)).toEqual(expected);
	});
});

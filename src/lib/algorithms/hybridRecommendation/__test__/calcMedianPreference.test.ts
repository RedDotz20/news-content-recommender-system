import { calcMedianPreference } from '@/lib/algorithms/hybridRecommendation/calcMedianPreference';
import { CategorialPreferenceType, LowerAndMedianPrefsType } from '@/types';

describe('calcMedianPreference', () => {
	test('should return correct median for odd number of preferences (7)', () => {
		const preferences: CategorialPreferenceType[] = [
			{ category: 'A', frequency: 1 },
			{ category: 'B', frequency: 2 },
			{ category: 'C', frequency: 3 },
			{ category: 'D', frequency: 4 },
			{ category: 'E', frequency: 5 },
			{ category: 'F', frequency: 6 },
			{ category: 'G', frequency: 7 },
		];

		const result: LowerAndMedianPrefsType = calcMedianPreference(
			0,
			preferences
		);
		expect(result.median).toEqual([{ category: 'D', frequency: 4 }]);
		expect(result.lowestBracket).toEqual([
			{ category: 'A', frequency: 1 },
			{ category: 'B', frequency: 2 },
			{ category: 'C', frequency: 3 },
		]);
	});

	test('should return correct medians for even number of preferences (8)', () => {
		const preferences: CategorialPreferenceType[] = [
			{ category: 'A', frequency: 1 },
			{ category: 'B', frequency: 2 },
			{ category: 'C', frequency: 3 },
			{ category: 'D', frequency: 4 },
			{ category: 'E', frequency: 5 },
			{ category: 'F', frequency: 6 },
			{ category: 'G', frequency: 7 },
			{ category: 'H', frequency: 8 },
		];

		const result: LowerAndMedianPrefsType = calcMedianPreference(
			0,
			preferences
		);
		expect(result.median).toEqual([
			{ category: 'D', frequency: 4 },
			{ category: 'E', frequency: 5 },
		]);
		expect(result.lowestBracket).toEqual([
			{ category: 'A', frequency: 1 },
			{ category: 'B', frequency: 2 },
			{ category: 'C', frequency: 3 },
		]);
	});

	test('should return correct medians for odd number of preferences (9)', () => {
		const preferences: CategorialPreferenceType[] = [
			{ category: 'A', frequency: 1 },
			{ category: 'B', frequency: 2 },
			{ category: 'C', frequency: 3 },
			{ category: 'D', frequency: 4 },
			{ category: 'E', frequency: 5 },
			{ category: 'F', frequency: 6 },
			{ category: 'G', frequency: 7 },
			{ category: 'H', frequency: 8 },
			{ category: 'I', frequency: 9 },
		];

		const result: LowerAndMedianPrefsType = calcMedianPreference(
			0,
			preferences
		);
		expect(result.median).toEqual([
			{ category: 'D', frequency: 4 },
			{ category: 'E', frequency: 5 },
			{ category: 'F', frequency: 6 },
		]);
		expect(result.lowestBracket).toEqual([
			{ category: 'A', frequency: 1 },
			{ category: 'B', frequency: 2 },
			{ category: 'C', frequency: 3 },
		]);
	});

	test('should return correct medians for more than 15 preferences', () => {
		const preferences: CategorialPreferenceType[] = Array.from(
			{ length: 16 },
			(_, i) => ({
				category: String.fromCharCode(65 + i),
				frequency: i + 1,
			})
		);

		const result: LowerAndMedianPrefsType = calcMedianPreference(
			0,
			preferences
		);
		expect(result.median).toEqual([
			{ category: 'D', frequency: 4 },
			{ category: 'E', frequency: 5 },
			{ category: 'F', frequency: 6 },
			{ category: 'G', frequency: 7 },
		]);
		expect(result.lowestBracket).toEqual(preferences.slice(0, 3));
	});

	test('should throw error for empty preferences array', () => {
		expect(() => calcMedianPreference(0, [])).toThrow(
			'Preferences array cannot be empty'
		);
	});
});

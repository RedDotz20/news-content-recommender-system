import { insertionSort } from '@/lib/algorithms/helper/insertionSort';
import { CategorialPreferenceType } from '@/types/userPreference';

describe('insertionSort', () => {
  test('should sort preferences in descending order based on frequency', () => {
    const preferences: CategorialPreferenceType[] = [
      { category: 'A', frequency: 5 },
      { category: 'B', frequency: 2 },
      { category: 'C', frequency: 3 }
    ];

    const sortedPreferences = insertionSort(preferences);

    expect(sortedPreferences).toEqual([
      { category: 'A', frequency: 5 },
      { category: 'C', frequency: 3 },
      { category: 'B', frequency: 2 }
    ]);
  });

  test('should throw an error for empty array', () => {
    expect(() => insertionSort([])).toThrow(
      'Invalid input: preferences must be a non-empty array.'
    );
  });

  test('should throw an error for non-array input', () => {
    // @ts-expect-error
    expect(() => insertionSort(null)).toThrow(
      'Invalid input: preferences must be a non-empty array.'
    );
    // @ts-expect-error
    expect(() => insertionSort(undefined)).toThrow(
      'Invalid input: preferences must be a non-empty array.'
    );
    expect(() => insertionSort('string' as any)).toThrow(
      'Invalid input: preferences must be a non-empty array.'
    );
  });

  test('should handle single element array', () => {
    const preferences: CategorialPreferenceType[] = [{ category: 'A', frequency: 5 }];

    const sortedPreferences = insertionSort(preferences);

    expect(sortedPreferences).toEqual([{ category: 'A', frequency: 5 }]);
  });

  test('should handle already sorted array', () => {
    const preferences: CategorialPreferenceType[] = [
      { category: 'A', frequency: 5 },
      { category: 'B', frequency: 3 },
      { category: 'C', frequency: 1 }
    ];

    const sortedPreferences = insertionSort(preferences);

    expect(sortedPreferences).toEqual([
      { category: 'A', frequency: 5 },
      { category: 'B', frequency: 3 },
      { category: 'C', frequency: 1 }
    ]);
  });

  test('should handle duplicates', () => {
    const preferences: CategorialPreferenceType[] = [
      { category: 'A', frequency: 5 },
      { category: 'B', frequency: 5 },
      { category: 'C', frequency: 3 }
    ];

    const sortedPreferences = insertionSort(preferences);

    expect(sortedPreferences).toEqual([
      { category: 'A', frequency: 5 },
      { category: 'B', frequency: 5 },
      { category: 'C', frequency: 3 }
    ]);
  });
});

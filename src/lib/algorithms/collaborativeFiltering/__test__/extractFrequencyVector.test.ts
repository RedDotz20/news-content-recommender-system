// All Pass

import { extractFrequencyVector } from '@/lib/algorithms/collaborativeFiltering/extractFrequencyVector';

describe('extractFrequencyVector', () => {
  // Happy path test case
  it('should return correct frequency values for valid input', () => {
    const prefVector = { category1: 5, category2: 3, category3: 0 };
    const allCategories = ['category1', 'category2', 'category3', 'category4'];
    const result = extractFrequencyVector(prefVector, allCategories);
    expect(result).toEqual([5, 3, 0, 0]);
  });

  // Edge case tests
  it('should return zero for all categories if prefVector is empty', () => {
    const prefVector = {};
    const allCategories = ['category1', 'category2'];
    const result = extractFrequencyVector(prefVector, allCategories);
    expect(result).toEqual([0, 0]);
  });

  it('should throw an error if prefVector is null', () => {
    const prefVector = null;
    const allCategories = ['category1', 'category2'];
    expect(() =>
      // @ts-expect-error
      extractFrequencyVector(prefVector, allCategories)
    ).toThrow('Invalid input: prefVector must be an object and allCategories must be an array.');
  });

  it('should throw an error if allCategories is not an array', () => {
    const prefVector = { category1: 1 };
    const allCategories = 'not an array';
    expect(() =>
      // @ts-expect-error
      extractFrequencyVector(prefVector, allCategories)
    ).toThrowError(
      'Invalid input: prefVector must be an object and allCategories must be an array.'
    );
  });

  it('should throw an error if allCategories contains non-string values', () => {
    const prefVector = { category1: 1 };
    const allCategories = ['category1', 2];
    expect(() =>
      // @ts-expect-error
      extractFrequencyVector(prefVector, allCategories)
    ).toThrow('Invalid category type: allCategories must contain only strings.');
  });

  it('should handle an empty allCategories array', () => {
    const prefVector = { category1: 1 };
    const allCategories: string[] = [];
    const result = extractFrequencyVector(prefVector, allCategories);
    expect(result).toEqual([]);
  });
});

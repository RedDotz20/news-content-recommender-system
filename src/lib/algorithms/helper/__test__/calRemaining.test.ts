import { calRemaining } from '@/lib/algorithms/helper/calRemaining';
import { CategorialPrefWithArticlesType } from '@/types';

describe('calRemaining', () => {
  it('should distribute the baseValue evenly across the group', () => {
    const baseValue = 10;
    const currentGroup: Partial<CategorialPrefWithArticlesType>[] = [{}, {}, {}];
    const result = calRemaining(baseValue, currentGroup);

    const totalAllocated = result.reduce((acc, item) => acc + (item.articles || 0), 0);
    expect(totalAllocated).toBe(baseValue); // No change needed
    expect(result.length).toBe(3);
  });

  it('should distribute all baseValue when group size is 1', () => {
    const baseValue = 10;
    const currentGroup: Partial<CategorialPrefWithArticlesType>[] = [{}];
    const result = calRemaining(baseValue, currentGroup);

    expect(result.length).toBe(1);
    expect(result[0].articles).toBe(baseValue);
  });

  it('should handle group with existing articles values correctly', () => {
    const baseValue = 15;
    const currentGroup: Partial<CategorialPrefWithArticlesType>[] = [
      { articles: 5 },
      { articles: 3 }
    ];
    const result = calRemaining(baseValue, currentGroup);

    const totalAllocated = result.reduce((acc, item) => acc + (item.articles || 0), 0);

    // Correctly expect the total allocated to be baseValue + existing articles
    expect(totalAllocated).toBe(baseValue + 8); // This is correct if the function appends the baseValue properly.
    expect(result.length).toBe(2);
  });

  it('should return an empty array if baseValue is 0', () => {
    const baseValue = 0;
    const currentGroup: Partial<CategorialPrefWithArticlesType>[] = [{}, {}, {}];
    const result = calRemaining(baseValue, currentGroup);

    expect(result).toEqual([]);
  });

  it('should return an empty array if currentGroup is empty', () => {
    const baseValue = 10;
    const currentGroup: Partial<CategorialPrefWithArticlesType>[] = [];
    const result = calRemaining(baseValue, currentGroup);

    expect(result).toEqual([]);
  });

  it('should not allow negative baseValue', () => {
    const baseValue = -5;
    const currentGroup: Partial<CategorialPrefWithArticlesType>[] = [{}, {}, {}];
    expect(() => calRemaining(baseValue, currentGroup)).toThrow('baseValue cannot be negative');
  });
});

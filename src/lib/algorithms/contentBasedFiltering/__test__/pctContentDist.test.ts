import { pctContentDist } from '@/lib/algorithms/contentBasedFiltering/pctContentDist';

describe('pctContentDist', () => {
  it('should return correct distribution for articleDistribution with default baseTarget', () => {
    const result = pctContentDist('articleDistribution');
    expect(result).toEqual({
      firstGroupVal: 30,
      secondGroupVal: 15,
      thirdGroupVal: 5
    });
  });

  it('should return correct distribution for categoryIdentifier with default baseTarget', () => {
    const result = pctContentDist('categoryIdentifier');
    expect(result).toEqual({
      firstGroupVal: 15,
      secondGroupVal: 15,
      thirdGroupVal: 20
    });
  });

  it('should correctly handle custom baseTarget', () => {
    const result = pctContentDist('articleDistribution', 100);
    expect(result).toEqual({
      firstGroupVal: 60,
      secondGroupVal: 30,
      thirdGroupVal: 10
    });
  });

  it('should throw error for negative baseTarget', () => {
    expect(() => pctContentDist('articleDistribution', -10)).toThrow(
      'baseTarget must be a non-negative number'
    );
  });

  it('should throw error for invalid distributionType', () => {
    expect(() => pctContentDist('invalidDistributionType' as any)).toThrow(
      'Invalid distributionType. Must be "contentBased" or "Overall".'
    );
  });

  it('should handle cases where secondListGroup becomes negative', () => {
    const result = pctContentDist('articleDistribution', 5);
    expect(result).toEqual({
      firstGroupVal: 3,
      secondGroupVal: 0,
      thirdGroupVal: 1
    });
  });

  it('should adjust secondListGroup correctly when total does not equal baseTarget', () => {
    const result = pctContentDist('categoryIdentifier', 49);
    expect(result).toEqual({
      firstGroupVal: 14,
      secondGroupVal: 14,
      thirdGroupVal: 21
    });
  });
});

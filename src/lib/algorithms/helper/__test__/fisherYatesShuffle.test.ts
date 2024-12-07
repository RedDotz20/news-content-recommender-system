import { fisherYatesShuffle } from '@/lib/algorithms/helper/fisherYatesShuffle';
import { Articles as ArticleTypes } from '@prisma/client';
import isEqual from 'lodash/isEqual';

describe('fisherYatesShuffle', () => {
  const mockArticles: ArticleTypes[] = [
    {
      id: '1',
      link: 'https://example.com/article1',
      category: 'Technology',
      authors: 'Author 1',
      date: new Date('2024-01-01'),
      headline: 'Technology Innovations in 2024',
      short_description: 'Exploring the top technological advancements for the year 2024.'
    },
    {
      id: '2',
      link: 'https://example.com/article2',
      category: 'Health',
      authors: 'Author 2',
      date: new Date('2024-02-15'),
      headline: 'The Future of Healthcare',
      short_description: 'How AI and data are transforming healthcare systems globally.'
    },
    {
      id: '3',
      link: 'https://example.com/article3',
      category: 'Science',
      authors: null,
      date: new Date('2024-03-10'),
      headline: 'Breakthroughs in Quantum Computing',
      short_description: null
    }
  ];

  test('should shuffle the array in a random order (happy path)', () => {
    const shuffled = fisherYatesShuffle(mockArticles);
    expect(shuffled.length).toBe(mockArticles.length);
    expect(isEqual(shuffled, mockArticles)).toBe(false); // Check that the shuffled array is not identical
  });

  test('should return a new array that contains the same elements', () => {
    const shuffled = fisherYatesShuffle(mockArticles);
    expect(shuffled.length).toBe(mockArticles.length);
    expect(isEqual(shuffled.sort(), mockArticles.sort())).toBe(true); // Deep comparison of sorted arrays
  });

  test('should throw an error if the input is not an array', () => {
    expect(() => fisherYatesShuffle(null as any)).toThrow(
      'Input must be a non-empty array of NewsItem objects.'
    );
    expect(() => fisherYatesShuffle({} as any)).toThrow(
      'Input must be a non-empty array of NewsItem objects.'
    );
  });

  test('should throw an error if the input is an empty array', () => {
    expect(() => fisherYatesShuffle([])).toThrow(
      'Input must be a non-empty array of NewsItem objects.'
    );
  });

  test('should handle a single-element array', () => {
    const singleArticle: ArticleTypes[] = [
      {
        id: '1',
        link: 'https://example.com/article1',
        category: 'Technology',
        authors: 'Author 1',
        date: new Date('2024-01-01'),
        headline: 'Technology Innovations in 2024',
        short_description: 'Exploring the top technological advancements for the year 2024.'
      }
    ];
    const shuffled = fisherYatesShuffle(singleArticle);
    expect(shuffled).toEqual(singleArticle); // No change for single element
  });
});

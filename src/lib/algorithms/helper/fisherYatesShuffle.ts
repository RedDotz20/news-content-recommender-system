import { Articles as ArticleTypes } from '@prisma/client';

/**
 * The Fisher-Yates shuffle algorithm.
 *
 * This algorithm shuffles a given array of numbers in a truly random order.
 * It is unbiased, meaning that every permutation of the array is equally likely to occur.
 *
 * @param array The array of numbers to shuffle.
 * @returns A new array with the same elements, but in a different order.
 * @throws {Error} If the input is not a non-empty array of numbers.
 * @performance
 * Time Complexity: O(n), where n is the number of elements in the input array.
 * Space Complexity: O(n), due to the creation of a copy of the input array.
 */

export function fisherYatesShuffle(inputArray: ArticleTypes[]): ArticleTypes[] {
  // Validate the input: must be a non-empty array
  if (!Array.isArray(inputArray) || inputArray.length === 0) {
    throw new Error('Input must be a non-empty array of NewsItem objects.');
  }

  // Create a copy of the input array to avoid modifying the original array
  const shuffledArray = [...inputArray];
  const arrayLength = shuffledArray.length;

  // Shuffle the array using the Fisher-Yates algorithm
  for (let currentIndex = arrayLength - 1; currentIndex > 0; currentIndex--) {
    // Generate a random index within the range of the current index
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    // Swap the current element with the randomly selected element
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex]
    ];
  }

  return shuffledArray;
}

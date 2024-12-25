/**
 * Calculates the cosine similarity between two vectors with specified decimal precision.
 *
 * The cosine similarity is a measure of similarity between two non-zero vectors
 * of an inner product space. It is calculated as the dot product of the vectors
 * divided by the product of their magnitudes.
 *
 * @param vectorA - The first vector as an array of numbers.
 * @param vectorB - The second vector as an array of numbers.
 * @param decimals - Number of decimal places to round the result to. Defaults to 4.
 * @returns The cosine similarity between vectorA and vectorB, rounded to the specified decimal places.
 * @throws Error if the input arrays do not have the same length.
 */
export function calcCosineSimilarity(
  vectorA: number[],
  vectorB: number[],
  decimals: number = 4 // defaults at 4 decimal places
): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Input arrays must have the same length.');
  }

  const dotProduct = vectorA.reduce((sum, value, index) => sum + value * vectorB[index], 0);

  const magnitudeA = Math.sqrt(vectorA.reduce((sum, value) => sum + value * value, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, value) => sum + value * value, 0));

  const similarity = magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  const factor = Math.pow(10, decimals);

  return Math.round(similarity * factor) / factor;
}

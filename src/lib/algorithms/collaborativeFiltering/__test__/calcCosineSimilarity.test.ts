// // All Pass

// import { calcCosineSimilarity } from '@/lib/algorithms/collaborativeFiltering/calcCosineSimilarity';

// describe('calcCosineSimilarity', () => {
//     // Happy path test case
//     it('should calculate cosine similarity correctly for two non-zero vectors', () => {
//         const vectorA = [1, 2, 3];
//         const vectorB = [4, 5, 6];
//         const result = calcCosineSimilarity(vectorA, vectorB, 4);
//         expect(result).toBeCloseTo(0.9746, 4);
//     });

//     // Edge case tests
//     it('should throw an error if the input arrays have different lengths', () => {
//         const vectorA = [1, 2];
//         const vectorB = [1, 2, 3];
//         expect(() => calcCosineSimilarity(vectorA, vectorB)).toThrow('Input arrays must have the same length.');
//     });

//     it('should return 0 if one of the vectors is zero', () => {
//         const vectorA = [0, 0, 0];
//         const vectorB = [4, 5, 6];
//         const result = calcCosineSimilarity(vectorA, vectorB, 4);
//         expect(result).toBe(0);
//     });

//     it('should return 0 if both vectors are zero', () => {
//         const vectorA = [0, 0, 0];
//         const vectorB = [0, 0, 0];
//         const result = calcCosineSimilarity(vectorA, vectorB, 4);
//         expect(result).toBe(0);
//     });

//     it('should round the result to the specified decimal places', () => {
//         const vectorA = [1, 2, 3];
//         const vectorB = [4, 5, 6];
//         const result = calcCosineSimilarity(vectorA, vectorB, 2);
//         expect(result).toBeCloseTo(0.97, 2);
//     });
// });
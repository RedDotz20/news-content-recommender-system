import { validateUsersInputArr } from './validateUsersInputArr';
import { calcCosineSimilarity } from './calcCosineSimilarity';
import { transformPrefsToVector } from './transformPrefToVector';
import { extractFrequencyVector } from './extractFrequencyVector';
import { UserPreferenceType, CollaborativeResults } from '@/types';

/**
 * Performs collaborative filtering to find the most similar user and other users' similarities.
 *
 * @param targetUser The target user for whom to find similarities.
 * @param allUsers An array of all users' preferences for comparison.
 * @returns An object containing the most similar user and a list of other users' similarities.
 */
export function collaborativeFiltering(
  targetUser: UserPreferenceType,
  allUsers: UserPreferenceType[]
): CollaborativeResults {
  // Validate both targetUser and remaining users input arrays
  validateUsersInputArr(targetUser, allUsers);

  const targetUserVector = transformPrefsToVector(targetUser.preferences);

  const allCategories = Array.from(
    new Set(allUsers.flatMap((user) => user.preferences.map((pref) => pref.category)))
  );

  let mostSimilarUser = null;
  let highestSimilarity = -1; // Initialize to a very low similarity score

  const otherUsersSimilarities: { userId: string; similarity: number }[] = [];

  allUsers.forEach((otherUser) => {
    if (otherUser.userId !== targetUser.userId) {
      // Exclude the target user from the comparison
      const otherUserVector = transformPrefsToVector(otherUser.preferences);
      const targetVector = extractFrequencyVector(targetUserVector, allCategories);
      const otherVector = extractFrequencyVector(otherUserVector, allCategories);
      const similarity = calcCosineSimilarity(targetVector, otherVector);

      // Collect similarities of other users
      otherUsersSimilarities.push({ userId: otherUser.userId, similarity });

      // Check if this user is more similar than the current highest
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        mostSimilarUser = {
          userId: otherUser.userId,
          preferences: otherUser.preferences,
          similarity
        }; // Store userId, preferences, and similarity
      }
    }
  });

  otherUsersSimilarities.sort((a, b) => b.similarity - a.similarity);

  const otherSimilarities = otherUsersSimilarities.slice(1);

  return { mostSimilarUser, otherSimilarities };
}

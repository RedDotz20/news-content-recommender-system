import { UserPreferenceType } from '@/types/userPreference';

/**
 * Validates that input arrays are non-empty arrays.
 *
 * @param userAPreferences - First input array.
 * @param userBPreferences - Second input array.
 * @throws Error if any input is not an array or if arrays are empty.
 */

export function validateUsersInputArr(
  targetUser: UserPreferenceType,
  allUsers: UserPreferenceType[]
): void {
  // Check if userAPreferences is a valid object
  if (typeof targetUser !== 'object' || targetUser === null) {
    throw new Error('userAPreferences must be a valid UserPreferenceType object');
  }

  // Check if preferences in userAPreferences is a non-null, non-empty array
  if (!Array.isArray(targetUser.preferences) || !targetUser.preferences.length) {
    throw new Error(
      'userAPreferences.preferences must be a non-null, non-empty array of CategorialPreferenceType'
    );
  }

  // Check if userBPreferences is an array
  if (!Array.isArray(allUsers)) {
    throw new Error('userBPreferences must be an array');
  }

  // Check if userBPreferences is not empty and each has non-null preferences
  if (!allUsers.length) {
    throw new Error('userBPreferences must not be empty');
  }

  for (const userBPreference of allUsers) {
    if (typeof userBPreference !== 'object' || userBPreference === null) {
      throw new Error('Each userBPreference must be a valid UserPreferenceType object');
    }

    if (!Array.isArray(userBPreference.preferences) || !userBPreference.preferences.length) {
      throw new Error(
        'Each userBPreference.preferences must be a non-null, non-empty array of CategorialPreferenceType'
      );
    }
  }
}

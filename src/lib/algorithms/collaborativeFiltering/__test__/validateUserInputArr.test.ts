//All Pass

import { validateUsersInputArr } from '@/lib/algorithms/collaborativeFiltering/validateUsersInputArr';
import { UserPreferenceType } from '@/types/userPreference';

describe('validateUsersInputArr', () => {
  const validUser: UserPreferenceType = {
    userId: 'user1',
    preferences: [
      { category: 'news', frequency: 5 },
      { category: 'sports', frequency: 3 }
    ]
  };

  const validUsersList: UserPreferenceType[] = [
    {
      userId: 'user2',
      preferences: [
        { category: 'movies', frequency: 2 },
        { category: 'music', frequency: 4 }
      ]
    },
    {
      userId: 'user3',
      preferences: [
        { category: 'travel', frequency: 5 },
        { category: 'food', frequency: 1 }
      ]
    }
  ];

  test('valid input should not throw an error', () => {
    expect(() => validateUsersInputArr(validUser, validUsersList)).not.toThrow();
  });

  test('targetUser is not an object', () => {
    expect(() => validateUsersInputArr(null as any, validUsersList)).toThrow(
      'userAPreferences must be a valid UserPreferenceType object'
    );
    expect(() => validateUsersInputArr(123 as any, validUsersList)).toThrow(
      'userAPreferences must be a valid UserPreferenceType object'
    );
  });

  test('targetUser preferences is not a valid array', () => {
    expect(() =>
      validateUsersInputArr({ userId: 'user1', preferences: [] } as any, validUsersList)
    ).toThrow(
      'userAPreferences.preferences must be a non-null, non-empty array of CategorialPreferenceType'
    );

    expect(() =>
      validateUsersInputArr({ userId: 'user1', preferences: null } as any, validUsersList)
    ).toThrow(
      'userAPreferences.preferences must be a non-null, non-empty array of CategorialPreferenceType'
    );
  });

  test('allUsers is not an array', () => {
    expect(() => validateUsersInputArr(validUser, null as any)).toThrow(
      'userBPreferences must be an array'
    );
    expect(() => validateUsersInputArr(validUser, 123 as any)).toThrow(
      'userBPreferences must be an array'
    );
  });

  test('allUsers is empty', () => {
    expect(() => validateUsersInputArr(validUser, [])).toThrow(
      'userBPreferences must not be empty'
    );
  });

  test('one of the userBPreferences is not an object', () => {
    expect(() => validateUsersInputArr(validUser, [null as any, ...validUsersList])).toThrow(
      'Each userBPreference must be a valid UserPreferenceType object'
    );

    expect(() => validateUsersInputArr(validUser, [123 as any, ...validUsersList])).toThrow(
      'Each userBPreference must be a valid UserPreferenceType object'
    );
  });

  test('one of the userBPreferences has invalid preferences', () => {
    expect(() =>
      validateUsersInputArr(validUser, [
        {
          userId: 'user2',
          preferences: []
        },
        ...validUsersList
      ])
    ).toThrow(
      'Each userBPreference.preferences must be a non-null, non-empty array of CategorialPreferenceType'
    );

    expect(() =>
      validateUsersInputArr(validUser, [
        {
          userId: 'user2',
          // @ts-expect-error
          preferences: null
        },
        ...validUsersList
      ])
    ).toThrow(
      'Each userBPreference.preferences must be a non-null, non-empty array of CategorialPreferenceType'
    );

    expect(() =>
      validateUsersInputArr(validUser, [
        {
          userId: 'user2',
          preferences: [{ category: null, frequency: null } as any]
        },
        ...validUsersList
      ])
    ).toThrow(
      'Each CategorialPreferenceType must have a valid category string and a frequency number'
    );
  });
});

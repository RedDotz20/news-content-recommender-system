'use server';

interface mutatePreferenceType {
  categories: {
    category: string;
    frequency: number;
  }[];
}

export const updateUserPerfs = async (userId: string, preferences: mutatePreferenceType) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  try {
    const response = await fetch(`${baseUrl}/api/updatePrefsArray/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret-key': process.env.API_SECRET_KEY as string
      },
      body: JSON.stringify({
        id: userId,
        pref: preferences
      })
    });

    // Check for response type
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      console.error(`Error: Received status ${response.status} from API`);
      throw new Error(`Server responded with a status of ${response.status}`);
    }

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Unexpected response format, not JSON');
    }

    return await response.json();
  } catch (err) {
    console.error('Error in updateUserPerfs:', err);
    throw new Error('Could not update user preferences. Please try again later.');
  }
};

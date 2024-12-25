// Don't use 'use server' diretive for signals to work correctly.

/**
 * Handles the like interaction for a given article by a user.
 *
 * Depending on the `isLiked` status, it sends a POST or DELETE request to
 * update the like status of an article. If the article is already liked, it
 * will send a DELETE request to remove the like; otherwise, it will send a
 * POST request to add a like.
 *
 * @param userId - The unique identifier of the user.
 * @param isLiked - A boolean indicating if the article is currently liked.
 * @param articleId - The unique identifier of the article.
 * @param category - The category of the article.
 * @param frequencyVal - The frequency value associated with the article.
 * @param signal - An AbortSignal to allow canceling the request.
 * @returns The data returned by the API if the request is successful.
 * @throws Will throw an error if the request fails or is aborted.
 */
export const handleLikeInteraction = async (
  userId: string,
  isLiked: boolean,
  articleId: string,
  category: string,
  frequencyVal: number,
  signal: AbortSignal
) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  try {
    const method = isLiked ? 'DELETE' : 'POST';
    const response = await fetch(`${baseUrl}/api/likes/${userId}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-secret-key': process.env.API_SECRET_KEY as string
      },
      body: JSON.stringify({
        articleId,
        category,
        frequencyVal
      }),
      signal
    });

    if (!response.ok) {
      const errorDetail = await response.json();
      throw new Error(`Failed to execute handleUserInteraction: ${errorDetail.error}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    const typedError = error as Error;

    if (typedError.name === 'AbortError') {
      console.log('Request was aborted by the user');
      return; // Exit early if the request was aborted
    }

    console.error('Error in handleUserInteraction:', typedError);
    throw new Error(
      `Could not perform user interaction update. Please try again later ${typedError}.`
    );
  }
};

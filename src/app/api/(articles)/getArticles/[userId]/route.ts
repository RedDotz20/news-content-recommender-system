import { NextRequest, NextResponse } from 'next/server';
import { fisherYatesShuffle } from '@/lib/algorithms';
import { prisma } from '@/lib/db';

/**
 * Returns a list of articles with their respective likes for a given user.
 *
 * The articles are shuffled to provide a randomized feed.
 *
 * The `limit` parameter can be used to limit the number of returned articles.
 *
 * @param req The NextRequest object.
 * @param props The NextResponse props.
 * @returns A NextResponse object with a JSON payload.
 */
export async function GET(req: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const { userId } = await props.params;
  const limitParam = req.nextUrl.searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam) : 0;

  try {
    const articles = await prisma.articles.findMany({
      include: {
        userInteractions: {
          where: { userId: userId },
          select: { id: true, isLiked: true }
        }
      },
      where: {
        link: { not: '' },
        authors: { not: null },
        headline: { not: '' },
        short_description: { not: null }
      },
      take: limit
    });

    const articlesWithLikes = articles.map((article) => ({
      ...article,
      isLiked: article.userInteractions.length > 0 && article.userInteractions[0].isLiked
    }));

    const shuffledArticles = fisherYatesShuffle(articlesWithLikes);

    return NextResponse.json({ data: shuffledArticles }, { status: 200 });
  } catch (error) {
    // Log the error and return a server error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(
      'Error fetching articles:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return NextResponse.json(
      { error: 'Error fetching articles', message: errorMessage },
      { status: 500 }
    );
  }
}

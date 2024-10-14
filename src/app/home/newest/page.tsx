import { API_SECRET_KEY } from '@/middleware';
import { Articles as ArticlesType } from '@prisma/client';
import { ArticleCard } from '@/components/ArticleCard';

async function getNewestArticles() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/getLatestArticles`,
		{
			next: { revalidate: 72000 }, // revalidate every 20 hours
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-secret-key': API_SECRET_KEY as string,
			},
		}
	);

	return response.json(); // Now safely parse it as JSON
}

export default async function NewestArticles() {
	const { data } = await getNewestArticles();

	console.log(data);

	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			<div className="flex flex-col justify-center lg:flex-row lg:flex-wrap gap-4 lg:p-4">
				{data.map((article: ArticlesType) => (
					<ArticleCard
						key={article.id}
						// id={article.id}
						className="aspect-w-16 aspect-h-9 lg:w-full"
						image={article.image_url as string}
						title={article.title}
						// description={article.description as string}
						time={article.pubDate}
						category={article.category}
					/>
				))}
			</div>
		</div>
	);
}

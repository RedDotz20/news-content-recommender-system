import { API_SECRET_KEY } from '@/middleware';
import { SampleArticles } from '@prisma/client';
import { ArticleCard } from '@/components/ArticleCard';

async function getNewestArticles() {
	const response = await fetch(
		'http://localhost:3000/api/articles/getArticles',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-secret-key': API_SECRET_KEY as string,
			},
		}
	);

	return response.json();
}

export default async function NewestArticles() {
	const { data } = await getNewestArticles();

	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			<div className="flex flex-col justify-center lg:flex-row lg:flex-wrap gap-4 lg:p-4">
				{data.map((article: SampleArticles) => (
					<ArticleCard
						key={article.article_id}
						className="aspect-w-16 aspect-h-9 lg:w-full"
						image={article.image_url}
						title={article.title}
						description={article.description as string}
						time={article.pubDate}
						category={article.category}
					/>
				))}
			</div>
		</div>
	);
}

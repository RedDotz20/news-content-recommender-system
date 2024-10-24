// import { CategoriesSelection } from '@/components/CategoriesSelection';
// import { ArticleCard } from '@/components/ArticleCard';
// import { ThemedLogo } from '@/components/ThemedLogo';
async function getHybridRecommendedArticles() {
	const response = await fetch(
		// sample user id and base target
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/getHybridArticles/cm2fq2zgm0000g97autnrdezv?baseTarget=60`,
		{
			next: { revalidate: 72000 }, // revalidate every 20 hours
			// next: { revalidate: 10 }, // revalidate every 20 hours
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-secret-key': process.env.API_SECRET_KEY as string,
			},
		}
	);

	return response.json();
}

export default async function HomePage() {
	// TODO: implement strict Typings
	// const res = await getHybridRecommendedArticles();

	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			{/* <GoogleSignOutButton /> */}
			{/* <ThemedLogo /> */}
			{/* <h1>Home Page</h1>
			{session && <h1>Hi, {JSON.stringify(session)}</h1>} */}
			{/* {res.recommendedArticles.map((articles: any) => {
				return (
					<ArticleCard
						id={articles.id}
						key={articles.id}
						className="aspect-w-16 aspect-h-9 lg:w-full"
						headline={articles.headline}
						authors={articles.authors}
						short_description={articles.short_description}
						date={articles.date}
						category={articles.category}
					/>
				);
			})} */}
			{/* <CategoriesSelection /> */}
		</div>
	);
}

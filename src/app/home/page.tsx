import { CategoriesSelection } from '@/features/pageRecommendation/pages/home/components/CategoriesSelection';
// import { ArticleCard } from '@/components/ArticleCard';
// import { ThemedLogo } from '@/components/ThemedLogo';

export default async function HomePage() {
	// TODO: implement strict Typings and Hybrid Recommendation

	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			<CategoriesSelection />
		</div>
	);
}

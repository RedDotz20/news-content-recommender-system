import { ArticleCard } from '@/components/ArticleCard';

export default async function HomePage() {
	return (
		<div className="flex items-center">
			<ArticleCard
				image="/placeholder.svg"
				title="The Rise of Sustainable Fashion"
				description="Exploring the growing movement towards eco-friendly and ethical clothing choices."
				author="John Doe"
				time="Sep 12, 2024"
				category={['Sustainability', 'Fashion']}
			/>
		</div>
	);
}

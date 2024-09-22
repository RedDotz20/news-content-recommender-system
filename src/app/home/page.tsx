import { ArticleCard } from '@/components/ArticleCard';
import { getProviders } from 'next-auth/react';

/**
 * @returns A JSX element representing the recommended articles.
 */
export default async function HomePage() {
	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			<ArticleCard
				image="/placeholder.svg"
				title="The Rise of Sustainable Fashion"
				// description="Exploring the growing movement towards eco-friendly and ethical clothing choices."
				// author="John Doe"
				time="Sep 12, 2024"
				category="latest"
			/>
		</div>
	);
}

'use client';

import { CategoriesSelection } from '@/features/pageRecommendation/pages/home/components/CategoriesSelection';

export default async function HomePageComponent() {
	// TODO: implement strict Typings and Hybrid Recommendation

	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			<CategoriesSelection />
		</div>
	);
}

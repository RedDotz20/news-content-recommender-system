'use client';

import { CategoriesSelection } from '@/features/pageRecommendation/pages/home/components/CategoriesSelection';
import { useCheckUserPref } from '@/features/pageRecommendation/pages/home/hooks/useCheckUserPref';

export default function HomePageComponent() {
	const { data, isLoading, error } = useCheckUserPref();

	// TODO: implement strict Typings and Hybrid Recommendation

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Preferences Error: {error.message}</div>;
	}

	return (
		<div className="flex items-center justify-center w-full flex-col sm:px-4">
			{/* {data ? <>Preferences Present</> : <CategoriesSelection />} */}

			<CategoriesSelection />
		</div>
	);
}

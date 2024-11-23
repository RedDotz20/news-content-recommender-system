'use client';

import HomeNavigation from '@/features/navigation/components/HomeNavigation';
import { UserPreferenceBoundary } from '@/features/handleUserPreferences/components/UserPreferenceBoundary';
import { HybridArticleRefetchBtn } from '../components/RefetchHybridArticles';
import { usePathname } from 'next/navigation';

export default function HomeLayoutComponent({
	children,
}: React.PropsWithChildren) {
	const pathname = usePathname();
	const isHomePage = pathname === '/home';

	return (
		<>
			<HomeNavigation />
			<div className="pt-20 lg:px-6 h-full">
				<div className="flex items-center justify-center w-full flex-col sm:px-4">
					<UserPreferenceBoundary>
						{isHomePage && (
							<div className="flex justify-between w-full mb-4 px-8">
								<p className="~text-lg/2xl font-bold">For You</p>
								<HybridArticleRefetchBtn />
							</div>
						)}
						{children}
					</UserPreferenceBoundary>
				</div>
			</div>
		</>
	);
}

import { PropsWithChildren } from 'react';
import HomeNavigation from '@/features/navigation/components/HomeNavigation';
import { UserPreferenceBoundary } from '@/features/handleUserPreferences/components/UserPreferenceBoundary';

export default function HomeLayoutComponent({ children }: PropsWithChildren) {
	return (
		<>
			<HomeNavigation />
			<div className="pt-20 lg:px-6 h-full">
				<div className="flex items-center justify-center w-full flex-col sm:px-4">
					<UserPreferenceBoundary>{children}</UserPreferenceBoundary>
				</div>
			</div>
		</>
	);
}

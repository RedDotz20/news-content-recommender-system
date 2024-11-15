import { PropsWithChildren } from 'react';
import HomeNavigation from '@/features/navigation/components/HomeNavigation';

export default function HomeLayoutComponent({ children }: PropsWithChildren) {
	return (
		<>
			<HomeNavigation />
			<div className="pt-20 lg:px-6 h-full">{children}</div>
		</>
	);
}

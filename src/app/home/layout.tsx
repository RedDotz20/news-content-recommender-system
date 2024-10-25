// import HomeNavigation from '@/features/navigation/components/HomeNavigation';
import HomeNavigation from '@/features/navigation/components/HomeNavigation';

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<>
			<HomeNavigation />
			<div className="pt-20 lg:px-6 h-full">{children}</div>
		</>
	);
}

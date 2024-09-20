import HomeNav from '@/components/HomeNav';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: DashboardLayoutProps) {
	return (
		<>
			<HomeNav />
			<div className="flex items-center justify-center h-dvh max-w-4xl mx-auto">
				{children}
			</div>
		</>
	);
}

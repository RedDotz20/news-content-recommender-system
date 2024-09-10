import { HomeNav } from '@/components/HomeNav';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const AuthLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	return (
		<>
			<HomeNav />
			<div className="flex items-center justify-center h-screen">
				{children}
			</div>
		</>
	);
};

export default AuthLayout;

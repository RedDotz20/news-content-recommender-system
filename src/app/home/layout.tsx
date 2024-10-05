import HomeNav from '@/components/HomeNav';

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<>
			<HomeNav />
			<div className="pt-20 lg:px-6 h-full">{children}</div>
			{/* <div className="flex items-center justify-center h-dvh mx-auto w-full">
				{children}
			</div> */}
		</>
	);
}

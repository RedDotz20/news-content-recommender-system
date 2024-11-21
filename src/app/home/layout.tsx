import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import HomeLayoutComponent from '@/features/hybridRecommendation/pages/layout';
import { getDistinctCategories } from '@/features/categorySelection/server/actions/fetchCategories';

export default async function HomeLayout({
	children,
}: React.PropsWithChildren) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['distinctCategories'],
		queryFn: () => getDistinctCategories(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomeLayoutComponent>{children}</HomeLayoutComponent>
		</HydrationBoundary>
	);
}

import type { PropsWithChildren } from 'react';
import RandomLayoutComponent from '@/features/pageRecommendation/pages/random/layout';

export default function RandomArticlesLayout({ children }: PropsWithChildren) {
	return <RandomLayoutComponent>{children}</RandomLayoutComponent>;
}

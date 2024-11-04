import type { PropsWithChildren } from 'react';
import NewestLayoutComponent from '@/features/pageRecommendation/pages/newest/layout';

export default function NewestLayout({ children }: PropsWithChildren) {
	return <NewestLayoutComponent>{children}</NewestLayoutComponent>;
}

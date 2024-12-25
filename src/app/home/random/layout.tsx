import type { PropsWithChildren } from 'react';
import RandomLayoutComponent from '@/features/randomRecommendation/pages/layout';

export default function RandomArticlesLayout({ children }: PropsWithChildren) {
  return <RandomLayoutComponent>{children}</RandomLayoutComponent>;
}

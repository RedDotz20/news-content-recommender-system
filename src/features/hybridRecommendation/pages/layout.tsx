'use client';

import HomeNavigation from '@/features/navigation/components/HomeNavigation';
import { UserPreferenceBoundary } from '@/features/handleUserPreferences/components/UserPreferenceBoundary';
import { HybridArticleRefetchBtn } from '../components/RefetchHybridArticles';
import { usePathname } from 'next/navigation';

export default function HomeLayoutComponent({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const isHomePage = pathname === '/home';

  return (
    <>
      <HomeNavigation />
      <div className="h-full pt-20 lg:px-6">
        <div className="flex w-full flex-col items-center justify-center sm:px-4">
          <UserPreferenceBoundary>
            {isHomePage && (
              <div className="mb-4 flex w-full items-center justify-between px-8">
                <p className="font-bold ~text-lg/2xl">For You</p>
                <HybridArticleRefetchBtn />
              </div>
            )}
            {children}
          </UserPreferenceBoundary>
        </div>
      </div>
    </>
  );
}

'use client';

import { Link } from 'next-view-transitions';
import { navigationLinks } from '../constants/NavigationConst';
import { usePathname } from 'next/navigation';

export const MobileNavigationMenu = () => {
  const pathname = usePathname();
  return (
    <div className="block sm:hidden">
      <nav className="shadow-t fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-background py-2">
        {navigationLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              href={link.href}
              className={`flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground ${isActive ? 'border-b-2 border-primary' : ''}`}
              prefetch={false}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

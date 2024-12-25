'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { navigationLinks } from '../constants/NavigationConst';
import { usePathname } from 'next/navigation';

export const TopBarNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-1">
          {navigationLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <NavigationMenuItem key={index}>
                <Link
                  legacyBehavior
                  passHref
                  href={link.href}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} ${isActive ? 'border-b-2 border-primary' : ''}`}
                  >
                    <span className="flex gap-2">
                      {link.icon}
                      {link.name}
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

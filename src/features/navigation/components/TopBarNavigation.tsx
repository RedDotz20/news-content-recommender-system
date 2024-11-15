import { Link } from 'next-view-transitions';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
	NavigationMenuItem,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navigationLinks } from '../constants/NavigationConst';

export const TopBarNavigation = () => {
	return (
		<nav className="hidden sm:flex items-center gap-4 text-sm font-medium">
			<NavigationMenu>
				<NavigationMenuList>
					{navigationLinks.map((link, index) => {
						return (
							<NavigationMenuItem key={index}>
								<Link
									legacyBehavior
									passHref
									href={link.href}
									className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										{link.name}
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

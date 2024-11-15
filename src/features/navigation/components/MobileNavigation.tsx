import { Link } from 'next-view-transitions';
import { navigationLinks } from '../constants/NavigationConst';

export const MobileNavigationMenu = () => {
	return (
		<div className="sm hidden">
			<nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-background py-2 shadow-t">
				{navigationLinks.map((link, index) => {
					return (
						<Link
							key={index}
							href={link.href}
							className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
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

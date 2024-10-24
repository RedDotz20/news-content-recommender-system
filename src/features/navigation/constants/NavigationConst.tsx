import {
	BarChartIcon,
	HomeIcon,
	PieChartIcon,
	MagicWandIcon,
	PersonIcon,
	GearIcon,
} from '@radix-ui/react-icons';

export const navigationLinks = [
	{
		name: 'Home',
		icon: <HomeIcon className="h-5 w-5" />,
		href: '/home',
	},
	{
		name: 'Newest',
		icon: <MagicWandIcon className="h-5 w-5" />,
		href: '/home/newest',
	},
	{
		name: 'Trending',
		icon: <BarChartIcon className="h-5 w-5" />,
		href: '/home/trending',
	},
	{
		name: 'Popular',
		icon: <PieChartIcon className="h-5 w-5" />,
		href: '/home/popular',
	},
];

export const avatarDropdownItems = [
	{
		icon: <PersonIcon className="mr-2 h-4 w-4" />,
		name: 'Theme',
	},
	{
		icon: <PersonIcon className="mr-2 h-4 w-4" />,
		name: 'Bookmarks',
	},
	{
		icon: <PersonIcon className="mr-2 h-4 w-4" />,
		name: 'Categories',
	},
	{
		icon: <PersonIcon className="mr-2 h-4 w-4" />,
		name: 'Profile',
	},
	// {
	// 	icon: <GearIcon className="mr-2 h-4 w-4" />,
	// 	name: 'Settings',
	// },
];

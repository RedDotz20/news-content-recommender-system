'use client';

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
	NavigationMenuItem,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import {
	ExitIcon,
	GearIcon,
	PersonIcon,
	BarChartIcon,
	HomeIcon,
	PieChartIcon,
	MagicWandIcon,
} from '@radix-ui/react-icons';
import { ThemeToggle } from './theme/ThemeToggle';

export default function HomeNav() {
	return (
		<div className="flex flex-col w-full fixed z-50">
			<header className="flex items-center justify-between bg-background shadow-sm px-6 sm:px-8 md:px-12 h-14 md:h-16">
				<Link
					href="/"
					className="flex items-center gap-2"
					prefetch={false}
				>
					<span className="text-lg font-semibold">ArticleHorizon</span>
				</Link>
				<nav className="hidden sm:flex items-center gap-4 text-sm font-medium">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link
									legacyBehavior
									passHref
									href="/home"
									className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Home
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link
									legacyBehavior
									passHref
									href="/home/newest"
									className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Newest
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link
									legacyBehavior
									passHref
									href="/home/trending"
									className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Trending
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link
									legacyBehavior
									passHref
									href="/home/popular"
									className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									prefetch={false}
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Popular
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</nav>
				<div className="flex gap-4">
					<ThemeToggle />
					<AvatarIcon />
					{/* <Link
							className={buttonVariants()}
							href="/auth"
						/> */}
				</div>
			</header>

			<div className="sm:hidden">
				<MobileNavigationMenu />
			</div>
		</div>
	);
}

const MobileNavigationMenu = () => {
	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-background py-2 shadow-t">
			<Link
				href="/home"
				className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
				prefetch={false}
			>
				<HomeIcon className="h-5 w-5" />
				Home
			</Link>
			<Link
				href="/home/newest"
				className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
				prefetch={false}
			>
				<MagicWandIcon className="h-5 w-5" />
				Newest
			</Link>
			<Link
				href="/home/trending"
				className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
				prefetch={false}
			>
				<BarChartIcon className="h-5 w-5" />
				Trending
			</Link>
			<Link
				href="/home/popular"
				className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
				prefetch={false}
			>
				<PieChartIcon className="h-5 w-5" />
				Popular
			</Link>
		</nav>
	);
};

const AvatarIcon = () => {
	const { data: session, status } = useSession();
	const SignOutUser = () => signOut({ redirect: true, callbackUrl: '/auth' });

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="overflow-hidden rounded-full"
				>
					<Avatar>
						<AvatarImage
							src={session?.user.image as string}
							alt={'A'}
						/>
						<AvatarFallback>A</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>
					<h3>{session?.user.name}</h3>
					<h4 className="text-xs font-light">{session?.user.email}</h4>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer"
					disabled={status === 'loading'}
				>
					<PersonIcon className="mr-2 h-4 w-4" />
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer"
					disabled={status === 'loading'}
				>
					<GearIcon className="mr-2 h-4 w-4" />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer hover:bg-red-300/30"
					onClick={SignOutUser}
					disabled={status === 'loading'}
				>
					<ExitIcon className="mr-2 h-4 w-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

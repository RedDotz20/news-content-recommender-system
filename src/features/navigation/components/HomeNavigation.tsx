import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MobileNavigationMenu } from './MobileNavigation';
import { AvatarDropDownMenu } from './AvatarDropDownMenu';
import { TopBarNavigation } from './TopBarNavigation';
import { ThemedLogo } from '@/components/customui/ThemedLogo';

export default function HomeNavigation() {
	return (
		<section className="flex flex-col w-full fixed z-50">
			<header className="flex items-center justify-between bg-background shadow-sm px-6 sm:px-8 md:px-12 h-14 md:h-16">
				<LogoInTitleLink />
				<TopBarNavigation />

				<div className="flex gap-4">
					<ThemeToggle />
					<AvatarDropDownMenu />
				</div>
			</header>

			<MobileNavigationMenu />
		</section>
	);
}

const LogoInTitleLink = () => {
	return (
		<Link
			href="/"
			prefetch={false}
			className="flex pt-2"
		>
			<div className="flex items-baseline h-auto">
				<span className="flex items-baseline h-auto text-lg font-semibold  mr-[-0.5px]">
					<ThemedLogo
						width={25}
						height={25}
					/>
				</span>
			</div>
			<span className="inline-block leading-[33px] py-0">rticleHorizon</span>
		</Link>
	);
};

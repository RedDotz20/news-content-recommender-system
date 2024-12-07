import { Link } from 'next-view-transitions';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MobileNavigationMenu } from './MobileNavigation';
import { AvatarDropDownMenu } from './AvatarDropDownMenu';
import { TopBarNavigation } from './TopBarNavigation';
import { ThemedLogo } from '@/components/customui/ThemedLogo';

export default function HomeNavigation() {
  return (
    <section className="fixed z-50 flex w-full flex-col">
      <header className="flex h-14 items-center justify-between bg-background px-6 shadow-sm sm:px-8 md:h-16 md:px-12">
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
    <Link href="/" prefetch={false} className="flex pt-2">
      <div className="flex h-auto items-baseline">
        <span className="mr-[-0.5px] flex h-auto items-baseline text-lg font-semibold">
          <ThemedLogo width={25} height={25} />
        </span>
      </div>
      <span className="inline-block py-0 leading-[33px]">rticleHorizon</span>
    </Link>
  );
};

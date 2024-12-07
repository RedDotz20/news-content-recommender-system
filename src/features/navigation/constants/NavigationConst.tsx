import { HomeIcon, ShuffleIcon, PersonIcon } from '@radix-ui/react-icons';

export const navigationLinks = [
  {
    name: 'Home',
    icon: <HomeIcon className="h-5 w-5" />,
    href: '/home'
  },
  {
    name: 'Random',
    icon: <ShuffleIcon className="h-5 w-5" />,
    href: '/home/random'
  }
];

export const avatarDropdownItems = [
  {
    icon: <PersonIcon className="mr-2 h-4 w-4" />,
    name: 'Bookmarks'
  }
];

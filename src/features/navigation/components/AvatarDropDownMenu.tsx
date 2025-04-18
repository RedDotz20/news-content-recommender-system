'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
  // DropdownMenuItem
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { useGetSessionData } from '@/features/auth/hooks/useGetSessionData';
import { SignOutButton } from '@/features/auth/components/SignOutButton';
// import { avatarDropdownItems } from '../constants/NavigationConst';
// import { Separator } from '@/components/ui/separator';

export const AvatarDropDownMenu = () => {
  const {
    user: { name, email, imageProfile },
    isLoading
  } = useGetSessionData();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={isLoading ? 'pointer-events-none' : ''}>
        <Button
          disabled={isLoading}
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage
              src={isLoading ? '/assets/avatar_placeholder.jpg' : (imageProfile as string)}
              alt={'A'}
            />
            <AvatarFallback>
              <AvatarImage src="/assets/avatar_placeholder.jpg" alt={'A'} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <h3>{name}</h3>
          <h4 className="text-xs font-light">{email}</h4>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* {avatarDropdownItems.map((item, index) => {
          return (
            <DropdownMenuItem key={index} className={`cursor-pointer`}>
              {item.icon}
              {item.name}
            </DropdownMenuItem>
          );
        })} */}
        {/* <Separator className="my-1" /> */}
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

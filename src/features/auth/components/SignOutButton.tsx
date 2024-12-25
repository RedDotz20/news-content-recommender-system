'use client';

import { ExitIcon } from '@radix-ui/react-icons';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOutUser } from '../server/actions/signOutUserAction';

export const SignOutButton = () => {
  // Logout button inside Avatar Dropdown Menu
  return (
    <DropdownMenuItem className="cursor-pointer hover:bg-red-300/30" onClick={() => signOutUser()}>
      <ExitIcon className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  );
};

'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

const UserAccountNav = () => {
	return (
		<Button
			onClick={() =>
				signOut({
					redirect: true,
					callbackUrl: '/auth',
				})
			}
			variant="destructive"
		>
			Sign Out
		</Button>
	);
};

export default UserAccountNav;

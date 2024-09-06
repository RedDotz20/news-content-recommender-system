'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import { useSession } from 'next-auth/react';

const Navbar = () => {
	// const session = await getServerSession(authOptions);
	const { data: session } = useSession();

	return (
		<div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
			<div className="flex items-center sm:justify-around justify-between w-full">
				<Link href="/">
					<HandMetal />
				</Link>

				{session?.user ? (
					<UserAccountNav />
				) : (
					<Link
						className={buttonVariants()}
						href="/auth"
					>
						Sign in
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;

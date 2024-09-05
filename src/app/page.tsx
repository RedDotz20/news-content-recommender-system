// import Dashboard from '../../components/Dashboard';

import { buttonVariants } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import User from '@/components/User';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex flex-col gap-2 items-center">
			{/* <Dashboard /> */}
			<h1>Home Page</h1>
			<Link
				className={buttonVariants()}
				href="/admin"
			>
				Open My Admin
			</Link>

			<div>
				<h2>Client Session:</h2>
				<User />
			</div>
			<div>
				<h2>Server Session:</h2>
				{JSON.stringify(session)}
			</div>
		</div>
	);
}

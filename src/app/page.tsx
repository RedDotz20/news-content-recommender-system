import { buttonVariants } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import User from '@/components/User';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<section className="h-screen flex flex-col justify-center  gap-6 p-64">
			<div className="flex flex-col gap-4 items-center">
				<h1>Main Page</h1>
				<Link
					className={buttonVariants()}
					href="/home"
				>
					Open My Dashboard
				</Link>
			</div>
			<div className="max-w-96">
				<h2 className="font-bold">Client Session:</h2>
				<User />
			</div>
			<div className="max-w-96">
				<h2 className="font-bold">Server Session:</h2>
				<p>{JSON.stringify(session)}</p>
			</div>
		</section>
	);
}

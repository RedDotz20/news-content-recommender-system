import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const AdminPage = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);

	if (session?.user) {
		return (
			<div className="flex items-center">
				<Avatar>
					<AvatarImage src={session?.user.image as string} />
					<AvatarFallback>
						<img
							src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"
							alt=""
						/>
					</AvatarFallback>
				</Avatar>
				<h2 className="ml-4">Welcome Back {session?.user.name}</h2>
			</div>
		);
	}

	return <div>Please Login to see this admin page</div>;
};

export default AdminPage;

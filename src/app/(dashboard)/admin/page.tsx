import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import User from '@/components/User';

const AdminPage = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);

	if (session?.user) {
		return <h2>Admin Page - Welcome Back {session?.user.username}</h2>;
	}

	return <div>Please Login to see this admin page</div>;
};

export default AdminPage;

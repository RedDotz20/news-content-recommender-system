'use client';

import { useSession } from 'next-auth/react';

const User = () => {
	const { data: session } = useSession();
	return <p>{JSON.stringify(session)}</p>;
};

export default User;

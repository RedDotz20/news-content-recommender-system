'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function Dashboard() {
	const { data: session, status } = useSession();

	const signInHandler = (provider: 'google' | 'github') => {
		return signIn(provider, { callbackUrl: '/' });
	};

	if (status === 'loading') {
		return <h1>Loading...</h1>;
	}

	if (status !== 'authenticated') {
		return (
			<div className="flex flex-col items-center">
				<h1 className="text-3xl text-red-500 font-bold mb-4">
					You're not logged in
				</h1>
				<div className="flex space-x-5">
					<button
						className="flex items-center transition duration-200 ease-in-out border border-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white"
						onClick={() => signInHandler('google')}
						// onClick={() => signIn('google', null, { prompt: 'login' })}
					>
						<img
							className="h-6 w-6 mr-2"
							src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
							alt="Google logo"
						/>
						Sign in with google
					</button>
					<button
						className="flex items-center transition duration-200 ease-in-out border border-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white"
						onClick={() => signInHandler('github')}
					>
						<img
							className="h-6 w-6 mr-2"
							src="https://github.com/fluidicon.png"
							alt="Github logo"
						/>
						Sign in with github
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center">
			<img
				className="rounded-full h-20 w-20 mb-4"
				src={session.user?.image as string}
				alt={session.user?.name as string}
			/>
			<h1 className="text-3xl text-green-500 font-bold mb-4">
				Welcome Back, {session.user?.name}
			</h1>
			<p className="text-2xl font-semibold mb-4">{session.user?.email}</p>

			<button
				className="transition duration-200 ease-in-out border border-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white"
				onClick={() =>
					signOut({
						//  callbackUrl: '/',
						redirect: false,
					})
				}
			>
				Sign Out
			</button>
			{/* <button
				className="transition duration-200 ease-in-out border border-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white mt-4"
				onClick={() => signInHandler('google')}
			>
				Switch to another Google account
			</button>
			<button
				className="transition duration-200 ease-in-out border border-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white mt-4"
				onClick={() => signInHandler('github')}
			>
				Switch to another Github account
			</button> */}
		</div>
	);
}

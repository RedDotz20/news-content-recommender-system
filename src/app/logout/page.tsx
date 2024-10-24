'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LogoutPage() {
	const router = useRouter();
	const [countdown, setCountdown] = useState(2);

	useEffect(() => {
		if (countdown === 0) {
			router.push('/login');
			return; // Exit early when countdown reaches 0
		}

		const timer = setInterval(() => {
			// Ensure countdown doesn't go below 0
			setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [countdown, router]);

	return (
		<section className="text-2xl grid place-items-center h-screen w-full">
			You have logged out... redirecting in {countdown} seconds.
		</section>
	);
}

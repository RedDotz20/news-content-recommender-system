'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LogoutPageComponent() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    if (countdown === 0) {
      return router.replace('/login');
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
    <section className="grid h-screen w-full place-items-center text-2xl">
      You have logged out... redirecting in {countdown} seconds.
    </section>
  );
}

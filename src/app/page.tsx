'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirect to login page by default
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Redirecting to login...</p>
    </div>
  );
}
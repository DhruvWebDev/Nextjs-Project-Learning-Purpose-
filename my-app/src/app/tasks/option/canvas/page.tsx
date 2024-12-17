'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if the user is fully loaded and doesn't exist
    if (isLoaded && !user) {
      router.push('/');
    }
  }, [isLoaded, user, router]);

  // Show a loading indicator while the user is being loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Only render the Tldraw component when the user is loaded
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw persistenceKey={`tldraw-${user?.id}`} />
    </div>
  );
}

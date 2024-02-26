'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Chat from './chat/page';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<string | null>();

  useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedIn') as string | null);
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (loggedIn === 'false' || loggedIn === null) {
      router.replace('/login');
    }
  }, [router, loggedIn]);

  return loggedIn === 'true' && <Chat />;
}

// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (!user) return router.push('/login');
      // fetch profile
      const snap = await getDoc(doc(db, 'users', user.uid));
      setDisplayName(snap.exists() ? (snap.data().displayName as string) : user.email);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <section
      aria-labelledby="dashboard-title"
      className="min-h-screen bg-slate-800 text-white p-6 flex items-center justify-center"
    >
      <div className="max-w-lg w-full bg-slate-900 p-8 rounded-xl shadow-lg">
        <h1 id="dashboard-title" className="text-2xl font-bold mb-4">
          Welcome, {displayName}
        </h1>
        <button
          onClick={handleSignOut}
          className="w-full inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg 
             border border-2-white hover:bg-white hover:text-slate-900 
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-4 cursor-pointer
             transition-colors duration-300"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}

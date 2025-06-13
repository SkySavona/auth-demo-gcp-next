// src/app/register/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
import { saveUserProfile } from '@/utils/saveUserProfile';

export default function RegisterPage() {
  const router = useRouter();

  const onSuccess = async () => {
    await saveUserProfile();
    router.push('/dashboard');
  };

  return (
    <section className="min-h-screen bg-slate-800 flex flex-col items-center justify-center p-4">
      <AuthForm mode="register" onSuccess={onSuccess} />

      <p className="mt-4 text-sm text-slate-300">
        Have an account?{' '}
        <Link
          href="/login"
          className="text-primary font-medium underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          Sign In
        </Link>
      </p>
    </section>
  );
}

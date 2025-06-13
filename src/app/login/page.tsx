// src/app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const onSuccess = () => router.push('/dashboard');

  return (
    <section className="min-h-screen bg-slate-800 flex flex-col items-center justify-center p-4">
      <AuthForm mode="login" onSuccess={onSuccess} />

      <p className="mt-4 text-sm text-slate-300">
        Don’t have an account?{' '}
        <Link
          href="/register"
          className="text-primary font-medium underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary rounded"
        >
          Register
        </Link>
      </p>
    </section>
  );
}

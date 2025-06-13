'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (_error: unknown) {
      if (_error instanceof Error) {
        setError(_error.message || 'Error sending reset email. Please check the email address.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <section className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Reset Password
        </h2>

        <label htmlFor="reset-email" className="block text-slate-200 font-medium mb-1">
          Enter your email
        </label>
        <input
          id="reset-email"
          name="reset-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        />

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        {message && <p className="text-sm text-green-400 mb-2">{message}</p>}

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold px-6 py-3 rounded-lg border hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-300"
        >
          Send Reset Email
        </button>
      </form>
    </section>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { confirmPasswordReset } from 'firebase/auth';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const passwordRef = useRef<HTMLInputElement>(null);
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!oobCode) {
      setError('Invalid or expired reset link.');
      return;
    }

    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError('Password must be at least 6 characters, include letters and numbers.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage('Password has been reset. Redirecting to login...');
      setTimeout(() => router.push('/login'), 2500);
    } catch (err) {
      setError('Error resetting password. Please try again or request a new link.');
    }
  };

  return (
    <section className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <form
        onSubmit={handleReset}
        role="form"
        aria-labelledby="reset-password-title"
        className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl"
      >
        <h2
          id="reset-password-title"
          className="text-2xl font-bold text-center text-white mb-6"
        >
          Reset Your Password
        </h2>

        {/* New Password */}
        <label htmlFor="new-password" className="block text-slate-200 font-medium mb-1">
          New Password
        </label>
        <div className="relative mb-1">
          <input
            ref={passwordRef}
            id="new-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            aria-describedby={error ? 'form-error' : 'password-help'}
            className="w-full pr-12 rounded-lg border border-slate-600 bg-slate-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <p id="password-help" className="mt-1 mb-4 text-xs text-slate-400">
          Password must be at least 6 characters and include letters and numbers.
        </p>

        {/* Confirm Password */}
        <label htmlFor="confirm-password" className="block text-slate-200 font-medium mb-1">
          Confirm Password
        </label>
        <div className="relative mb-4">
          <input
            id="confirm-password"
            type={showConfirm ? 'text' : 'password'}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full pr-12 rounded-lg border border-slate-600 bg-slate-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div id="form-error" role="alert" className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        {message && (
          <div role="status" className="text-green-400 text-sm mb-4">
            {message}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold px-6 py-3 rounded-lg border border-2-white hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-4 transition-colors duration-300"
        >
          Reset Password
        </button>
      </form>
    </section>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess: () => void;
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const isRegister = mode === 'register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (isRegister && !strongPasswordRegex.test(password)) {
      setError('Password must be at least 6 characters, include letters and numbers.');
      return;
    }

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        setStatus('Account created successfully.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setStatus('Signed in successfully.');
      }
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const code = err.code;
        switch (code) {
          case 'auth/user-not-found':
            setError('No account found with that email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password.');
            break;
          default:
            setError(`Authentication error: ${code.replace('auth/', '').replace(/-/g, ' ')}`);
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      role="form"
      aria-labelledby="auth-form-title"
      className="max-w-md w-full mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl"
    >
      <h2
        id="auth-form-title"
        className="text-2xl font-bold text-center text-white mb-6"
      >
        {isRegister ? 'Create Account' : 'Sign In'}
      </h2>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-slate-200 font-medium mb-1">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          aria-required="true"
          aria-describedby={error ? 'form-error' : undefined}
          autoComplete="username"
          className="w-full rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-slate-200 font-medium mb-1">
          Password <span aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-required="true"
            minLength={6}
            aria-describedby={`password-help${error ? ' form-error' : ''}`}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            className="w-full pr-12 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {isRegister && (
          <p id="password-help" className="mt-2 text-xs text-slate-400">
            Password must be at least 6 characters and include letters and numbers.
          </p>
        )}
      </div>

      {/* Error & Status */}
      {error && (
        <div id="form-error" role="alert" className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}
      {status && (
        <div role="status" className="text-green-400 text-sm mb-4">
          {status}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold px-6 py-3 rounded-lg border border-2-white hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-4 transition-colors duration-300"
      >
        {isRegister ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
}

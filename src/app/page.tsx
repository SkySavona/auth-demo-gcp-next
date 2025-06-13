// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <section
      aria-labelledby="home-title"
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-800 text-white"
    >
      <h1
        id="home-title"
        className="text-3xl font-bold mb-4"
      >
        Welcome to Auth Demo
      </h1>
      <p className="text-lg mb-6">
        Please log in to access the dashboard and features.
      </p>
      <Link
  href="/login"
  className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg 
             border border-2-white hover:bg-white hover:text-slate-900 
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
             transition-colors duration-300"
>
  Go to Login
</Link>

    </section>
  );
}

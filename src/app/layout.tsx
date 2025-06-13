// app/layout.tsx
import './globals.css';
import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-slate-800 text-slate-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only p-2 bg-primary text-white"
        >
          Skip to content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}

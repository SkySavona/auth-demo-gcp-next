// next.config.ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Allow Firebase, Google APIs, and password manager/autofill scripts
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://accounts.google.com https://*.firebaseio.com https://*.googleapis.com`,
  "connect-src 'self' blob: https://*.firebaseio.com https://*.googleapis.com",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  // Allow frames for Chrome/Edge password managers
  "frame-src 'self' https://accounts.google.com",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options",            value: "SAMEORIGIN" }, // Changed from DENY to allow trusted frames
        ],
      },
    ];
  },
};

export default nextConfig;

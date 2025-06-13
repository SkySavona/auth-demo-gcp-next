// next.config.js
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // allow inline scripts, and eval() in dev for React Refresh
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.firebaseio.com https://*.googleapis.com`,
  "connect-src 'self' blob: https://*.firebaseio.com https://*.googleapis.com",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "frame-src 'none'",
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
          { key: "X-Frame-Options",            value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;

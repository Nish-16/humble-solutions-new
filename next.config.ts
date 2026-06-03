import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Content Security Policy
// ---------------------------------------------------------------------------
// Directives are chosen to allow all current dependencies while blocking
// everything not explicitly permitted:
//
//  default-src 'self'        — fallback: only same-origin
//  script-src                — same-origin bundles + cdnjs (GSAP CDN in
//                              TimelineSection) + 'unsafe-inline' (Next.js
//                              hydration scripts) + 'unsafe-eval' (lottie-web
//                              expression evaluator)
//  style-src 'unsafe-inline' — Tailwind, GSAP, Framer Motion all write inline
//                              styles at runtime
//  img-src                   — same-origin, data URIs (SVG/base64), blob
//                              (Three.js textures), placehold.co (next.config
//                              remotePatterns)
//  font-src 'self'           — next/font/google downloads fonts at build time
//                              and serves them from /_next/static; no runtime
//                              request to fonts.googleapis.com is needed
//  connect-src               — Firebase Firestore, Analytics, Storage +
//                              Google Analytics endpoints
//  frame-src                 — Firebase SDK may open firebaseapp.com iframes
//                              for cross-domain messaging
//  worker-src blob:          — Three.js may spawn blob workers
//  object-src 'none'         — blocks Flash and other plugin embeds
//  base-uri 'self'           — prevents base-tag injection attacks
//  form-action 'self'        — form POST targets must be same-origin
//  frame-ancestors 'none'    — equivalent to X-Frame-Options: DENY (CSP3)
//  upgrade-insecure-requests — force HTTP sub-resources to HTTPS
// ---------------------------------------------------------------------------
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://placehold.co;
  font-src 'self' data:;
  connect-src 'self'
    https://*.googleapis.com
    https://*.firebaseio.com
    wss://*.firebaseio.com
    https://*.firebaseapp.com
    https://firebasestorage.googleapis.com
    https://www.google-analytics.com
    https://analytics.google.com
    https://stats.g.doubleclick.net
    https://www.googletagmanager.com;
  frame-src 'self' https://*.firebaseapp.com;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\n/g, " ")
  .replace(/\s{2,}/g, " ")
  .trim();

// ---------------------------------------------------------------------------
// Security headers applied to every route
// ---------------------------------------------------------------------------
const securityHeaders = [
  // Prevents browsers from MIME-sniffing a response away from the declared
  // Content-Type. Blocks content-type confusion attacks.
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  // Blocks the page from being loaded in any <iframe>/<frame>/<object>.
  // Prevents clickjacking. Redundant with frame-ancestors in CSP but kept
  // for legacy browser support (IE11, old Safari).
  {
    key: "X-Frame-Options",
    value: "DENY",
  },

  // Controls how much referrer information is sent with requests.
  // 'strict-origin-when-cross-origin' sends full path for same-origin,
  // only origin for cross-origin HTTPS, and nothing for HTTP downgrades.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  // Disables browser features this site does not use.
  // Reduces attack surface if a script is ever compromised.
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
      "interest-cohort=()",
    ].join(", "),
  },

  // Tells browsers to only access this site over HTTPS for the next 2 years.
  // includeSubDomains covers any subdomains.
  // preload opts into the browser's built-in HSTS preload list.
  // Safe on Vercel which always serves HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // Prevents a browsing context opened from this page from retaining a
  // reference back to the opener. 'same-origin-allow-popups' is used instead
  // of 'same-origin' so that any future Firebase Auth popup flows are not
  // blocked (Firebase signInWithPopup requires window.opener access).
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },

  // The main CSP directive — see detailed comments above.
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (50% smaller than WebP), fall back to WebP, then original.
    formats: ["image/avif", "image/webp"],
    // Allow next/image to optimize testimonial placeholder images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

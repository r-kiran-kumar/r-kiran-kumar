/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Performance ───────────────────────────────────────────────────────────
  compress: true,
  poweredByHeader: false, // Don't reveal Next.js version to attackers

  // ─── Image Optimization ────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF first for best compression
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rkirankumar.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ─── Security & SEO HTTP Headers ─────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevents clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevents MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Forces HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Referrer policy for privacy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions policy
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/assets/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Block admin/API from search engines at HTTP level too
        source: '/admin/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },

  // ─── Redirects — canonical URL enforcement ──────────────────────────────
  async redirects() {
    return [
      // Redirect www to non-www (canonical)
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'www.rkirankumar.com' }],
        destination: 'https://rkirankumar.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

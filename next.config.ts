import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' https://assets.blast.io; frame-ancestors https//:app.blast.io https://*.testblast.io/"
          },
        ],
      },
    ];
  },
};

export default nextConfig;

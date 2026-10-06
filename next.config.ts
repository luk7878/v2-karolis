import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/:path*", destination: "/projektai/:path*", permanent: true },
      { source: "/articles/:path*", destination: "/straipsniai/:path*", permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/adminha.html", destination: "/adminha" }];
  },
};

export default nextConfig;

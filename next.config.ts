import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["geoip-lite", "@prisma/client", "bcryptjs"],
  async rewrites() {
    return [{ source: "/adminha.html", destination: "/adminha" }];
  },
};

export default nextConfig;

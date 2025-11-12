import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**"
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**"
      },

    ]
  }
};

export default nextConfig;

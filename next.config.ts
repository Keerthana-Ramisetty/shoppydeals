import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";



const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "shoppydeals.onrender.com",
      pathname: "/uploads/**",
    },
    {
      protocol: "http",
      hostname: "localhost",
      port: "5000",
      pathname: "/uploads/**",
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
  ],
},

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${apiUrl}/uploads/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: ["**/backend/**"],
    };
    return config;
  },
};

export default nextConfig;

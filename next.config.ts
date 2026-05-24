import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function apiImagePatterns(): { protocol: "http" | "https"; hostname: string; port?: string; pathname: string }[] {
  try {
    const u = new URL(apiUrl);
    const protocol = u.protocol.replace(":", "") as "http" | "https";
    const pattern = {
      protocol,
      hostname: u.hostname,
      pathname: "/uploads/**" as const,
      ...(u.port ? { port: u.port } : {}),
    };
    return u.hostname === "localhost" ? [pattern] : [pattern];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...apiImagePatterns(),
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
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next-mdx-remote still needs this under Turbopack.
  // See https://github.com/hashicorp/next-mdx-remote#installation
  transpilePackages: ["next-mdx-remote"],
  // Playwright / tooling often hits 127.0.0.1 while Next binds as localhost.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;

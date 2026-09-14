import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next-mdx-remote still needs this under Turbopack.
  // See https://github.com/hashicorp/next-mdx-remote#installation
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;

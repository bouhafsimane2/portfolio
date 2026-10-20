import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Un package-lock.json existe aussi dans le dossier parent : on fixe la racine du projet
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["playwright-core", "@sparticuz/chromium-min", "@remotion/renderer", "@remotion/bundler"],
};

export default nextConfig;

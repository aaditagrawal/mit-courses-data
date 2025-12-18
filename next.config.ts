import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Setup Cloudflare bindings for local development
if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  // Remove 'export' - next-on-pages handles SSR on Workers
  // No static export needed
};

export default nextConfig;

import type { NextConfig } from "next";
import stylexOptions from "./stylex.config.cjs";

const stylexLoader = {
  loader: "babel-loader",
  options: {
    babelrc: false,
    configFile: false,
    plugins: [["@stylexjs/babel-plugin", stylexOptions]],
  },
};
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Setup Cloudflare bindings for local development
if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  turbopack: { rules: { "*.stylex.js": { loaders: [stylexLoader], as: "*.js" } } },
  webpack(config) {
    config.module.rules.push({ test: /\.stylex\.js$/, use: [stylexLoader] });
    return config;
  },
  // Remove 'export' - next-on-pages handles SSR on Workers
  // No static export needed
};

export default nextConfig;

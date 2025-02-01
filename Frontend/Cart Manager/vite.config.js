import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // For relative paths
  build: {
    outDir: "dist", // Vercel serves from 'dist'
  },
  server: {
    historyApiFallback: true, // Ensures routing works correctly for SPAs
  },
});

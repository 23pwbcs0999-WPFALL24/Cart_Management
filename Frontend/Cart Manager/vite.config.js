import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Changed from './' to '/' for Vercel deployment
  build: {
    outDir: "dist", // Vercel serves from 'dist'
  },
  server: {
    historyApiFallback: true, // Ensures routing works correctly for SPAs
  },
});

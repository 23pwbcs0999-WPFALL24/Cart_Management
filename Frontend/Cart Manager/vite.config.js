import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures that assets are served correctly in a relative path for deployment
  build: {
    outDir: "dist", // Vercel serves from 'dist'
    rollupOptions: {
      output: {
        manualChunks: undefined, // Helps with chunking issues, remove if you don't need manual chunking
      },
    },
  },
  server: {
    historyApiFallback: true, // Ensures client-side routing works for SPA (important for React)
  },
});

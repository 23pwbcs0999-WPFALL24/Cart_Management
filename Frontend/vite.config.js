import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Use '/' for root deployment on Vercel
  build: {
    outDir: "dist", // Vercel serves from the 'dist' folder after build
  },
  server: {
    historyApiFallback: true, // Ensures routing works correctly for SPAs (important for React Router)
  },
});

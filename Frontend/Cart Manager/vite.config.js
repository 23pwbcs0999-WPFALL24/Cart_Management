// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Changed from "/" to "./" for better path resolution
  build: {
    outDir: "dist", // Vercel serves from 'dist'
    rollupOptions: {
      output: {
        manualChunks: undefined, // Helps with chunking issues
      },
    },
  },
  server: {
    historyApiFallback: true, // Handle client-side routing
  },
});

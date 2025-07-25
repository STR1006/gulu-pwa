// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path'; // Still good to have path imported, even if not directly used for alias in the end

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ /* ... config ... */ })
  ],
  resolve: {
    alias: {
      "@": "/src", // Keep this for Vite's resolution
    },
  },
});
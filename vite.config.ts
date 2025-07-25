import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'pwa-icon-192.png', 'pwa-icon-512.png'],
      manifest: {
        name: 'Gulu Inventory PWA App',
        short_name: 'Gulu PWA',
        description: 'Gulu Inventory PWA App for managing shelf restocking',
        theme_color: '#58ab7f',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
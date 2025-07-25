import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for deployment to GitHub Pages.
  // Replace 'gulu-pwa' with the actual name of your GitHub repository.
  base: '/gulu-pwa/', 
});

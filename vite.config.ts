import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure this matches your GitHub repository name exactly
  // It must start and end with a slash!
  base: '/gulu-pwa/', // <--- THIS IS THE CRITICAL LINE
});

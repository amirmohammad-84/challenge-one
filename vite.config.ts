import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://harf.roshan-ai.ir',
        changeOrigin: true,
        secure: false,
      },
      '/media_image': {
        target: 'https://harf.roshan-ai.ir',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
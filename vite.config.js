import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        refund: resolve(__dirname, 'refund.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
});

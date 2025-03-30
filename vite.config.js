import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3001
    // headers: {
    //   'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    // }
  },
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx}"'
      }
    })
  ]
});

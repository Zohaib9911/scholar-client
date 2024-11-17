import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr'
import ClosePlugin from './vite-plugin-close';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false,
      },
    },
  },
  plugins: [react(),
  svgr({
    svgrOptions: {
      // svgr options
    },
  }),
    // ClosePlugin(), // close Plugin
  ],
});

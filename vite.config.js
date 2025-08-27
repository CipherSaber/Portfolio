import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Suppress console warnings in development
    __SUPPRESS_CONSOLE_WARNINGS__: JSON.stringify(true),
  },
  esbuild: {
    // Suppress specific console warnings during build
    logOverride: {
      'this-is-undefined-in-esm': 'silent',
    },
  },
  build: {
    // Ensure proper production build
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB for 3D apps
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['motion']
        }
      }
    }
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],

});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-dom')) return 'vendor-react-dom';
          if (id.includes('/react/') || id.includes('node_modules\\react') || id.includes('node_modules/react')) return 'vendor-react';
          if (id.includes('react-router-dom')) return 'vendor-router';
          if (id.includes('@tanstack') || id.includes('react-query')) return 'vendor-query';
          if (id.includes('@supabase') || id.includes('supabase')) return 'vendor-supabase';
          if (id.includes('recharts')) return 'vendor-recharts';
          if (id.includes('embla-carousel-react')) return 'vendor-carousel';
          if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('sonner')) return 'vendor-ui';
          return 'vendor';
        },
      },
    },
  },
});


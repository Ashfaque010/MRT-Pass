import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite"; // Import tempo plugin

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "framer-motion"],
          ui: [
            "@radix-ui/react-avatar",
            "@radix-ui/react-progress",
            "@radix-ui/react-tabs",
            "@radix-ui/react-radio-group",
          ],
        },
      },
    },
  },
  plugins: [react(), tempo()], // Add tempo plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Allow Tempo to access the dev server
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
});

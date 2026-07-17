import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// The catalog consumes the kit through its public entry only.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tpl/ui": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
    },
  },
});

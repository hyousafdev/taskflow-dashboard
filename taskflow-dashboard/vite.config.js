import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// ES module mein __dirname nahi hota, isliye manually banate hain
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ab "@" ka matlab hai: project folder ka poora path + /src
      "@": path.resolve(__dirname, "src"),
    },
  },
});
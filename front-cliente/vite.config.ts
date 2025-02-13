import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite conexiones desde cualquier dispositivo en la red
    port: 5173,
    strictPort: true,
  },
});

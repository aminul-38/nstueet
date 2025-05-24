import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // This allows the app to be accessed from other devices
    port: 5173, // Optional: You can change the port if needed
  },
  plugins: [react()],
});

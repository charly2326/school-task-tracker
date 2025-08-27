import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
  const isReplit =
    process.env.NODE_ENV !== "production" && process.env.REPL_ID;
  const cartographerPlugin = isReplit
    ? [await import("@replit/vite-plugin-cartographer").then((m) => m.cartographer())]
    : [];

  return {
    plugins: [react(), runtimeErrorOverlay(), ...cartographerPlugin],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "www"), // 👈 compatible con Ionic
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});

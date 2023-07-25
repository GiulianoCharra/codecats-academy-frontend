import { defineConfig } from "vite";

export default defineConfig({
  base: "/codecats-academy/",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});

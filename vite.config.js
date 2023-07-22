import { defineConfig } from "vite";

export default defineConfig({
  base: "/codecats-academy/",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/index.html",
        cursos: "./src/pages/cursos.html",
        curso: "./src/pages/curso.html",
        pago: "./src/pages/pago.html",
        perfil: "./src/pages/perfil.html",
        contacto: "./src/pages/contacto.html",
      },
    },
  },
});

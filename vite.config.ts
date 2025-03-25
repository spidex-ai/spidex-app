import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/src/assets/icons/*.svg?react',
      svgrOptions: {
        plugins: ["@svgr/plugin-jsx"]
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
})

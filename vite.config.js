import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Ruta base necesaria para GitHub Pages (debe coincidir con el
  // nombre del repositorio): Exp2_S5_Felipe_Gennari_Frontend_2
  base: '/Exp2_S5_Felipe_Gennari_Frontend_2/',
  plugins: [react()],
})

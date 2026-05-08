import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',        // ⭐⭐⭐ 关键一行 ⭐⭐⭐
  plugins: [vue()],
})

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath} from "url";

export default defineConfig({
  base: './',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/utilities/variables" as *;`
      }
    }
  },
  server: {
    // 서버 API 용 프록시 정보를 추가한다.
    proxy: {
      '/api': {
        target: 'https://skt-zem.co.kr',
        changeOrigin: true,
        // secure: false,
      },
    }
  },
})

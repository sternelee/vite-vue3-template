import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias({
      entries: [
        { find: /@utils\/(.*)/, replacement: './utils/$1.ts'},
        { find: /@lib\/(.*)/, replacement: './lib/$1.ts'},
        { find: /@api\/(.*)/, replacement: './api/$1.js'},
        { find: /@\/components\/([^']*)/, replacement: './components/$1.vue'}
      ]
    }),
    vue()
  ]
})

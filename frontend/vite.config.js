import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/react-fontawesome'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  // server configuration block
  server:{
    host:'localhost',
    port:'5173',
    strictPort:true,
}
}


)

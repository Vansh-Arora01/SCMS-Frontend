import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Smart Complaint Management System',
        short_name: 'SCMS',
        description: 'Complaint Management System for Students',
        theme_color: '#2563eb',
        display: "standalone",
        icons: [
          {
            src: 'SCMS_logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'SCMS_logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
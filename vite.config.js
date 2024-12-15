import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        VitePWA({ 
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,svg,ico,json,woff2}'],
            },
            manifest: {
                name: 'Eureka',
                short_name: 'Eureka',
                description: 'My Awesome App description',
                theme_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                    },
                    {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                    }
                ]
            },  
            outDir: 'public/build',
            registerSW: true,
            injectRegister: 'auto',
            scope: '/',
            base: '/',
         }),
        react(),
    ],
    server: {
        host: 'eureka.test', // Memastikan bisa diakses melalui domain seperti eureka.test
        port: 3000,
        https: false,
    },
});

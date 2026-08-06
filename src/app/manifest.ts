import {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Scriptium: Theological & Philosophical Sources',
        short_name: 'Scriptium',
        description: 'A comprehensive platform for collecting and presenting theological and philosophical heritage.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1a1a1a',
        icons: [
                {
                  src: '/icon/scriptium-dark-theme-icon-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                  purpose: 'maskable',
                },
                {
                  src: '/icon/scriptium-dark-theme-icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any',
                },
                {
                  src: '/icon/scriptium-light-theme-icon-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: '/icon/scriptium-light-theme-icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
        ]   
    }
}
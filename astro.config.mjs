import { defineConfig } from 'astro/config'

// https://astro.build/config
import preact from '@astrojs/preact';

export default defineConfig({
    output: 'server',
    integrations: [preact()],
})


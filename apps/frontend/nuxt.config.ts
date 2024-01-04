import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // SPA mode
  typescript: {
    typeCheck: true,
  },
  devtools: { enabled: true },
  devServer: {
    port: 4000,
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    // vuetify
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    // auth
    '@sidebase/nuxt-auth',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});

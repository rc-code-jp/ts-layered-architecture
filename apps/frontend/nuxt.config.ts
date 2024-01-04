import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  auth: {
    baseURL: `${process.env.API_URL}/`,
    provider: {
      type: 'refresh',
      endpoints: {
        signUp: { path: '/auth/sigup', method: 'post' },
        signIn: { path: '/auth/signin', method: 'post' },
        getSession: { path: '/auth/me' },
        refresh: { path: '/auth/refresh-token', method: 'post' },
      },
      pages: {
        login: '/auth/signin',
      },
      token: {
        signInResponseTokenPointer: '/accessToken',
        maxAgeInSeconds: 60 * 5, // 5 min
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: '/refreshToken',
      },
    },
  },
});

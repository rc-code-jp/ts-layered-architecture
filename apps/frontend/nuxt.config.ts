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
});

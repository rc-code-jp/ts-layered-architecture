// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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

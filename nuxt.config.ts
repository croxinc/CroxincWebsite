// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/image'],
  css: ['~/assets/css/default.css'],  
  ssr: false,
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets/',
  },
  image:{
    dir: 'public'
  },
})
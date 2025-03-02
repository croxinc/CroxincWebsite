// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/default.css'],
  modules: ['@nuxt/image'],
  // image: {
  //   dir: 'public/images',
  // },
  app: {
    baseURL: '/'
  },
  ssr: false,
  nitro: {
    preset: 'static'
  },
})
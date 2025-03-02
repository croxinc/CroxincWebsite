export default {
  target: 'static', // Generate a static site
  head: {
    title: 'Croxinc Website',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Croxinc Website description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    // Global CSS files can be added here
  ],
  plugins: [
    // Plugins can be added here
  ],
  components: true, // Auto import components
  buildModules: [
    // Build modules can be added here
  ],
  modules: [
    // Nuxt modules can be added here
  ],
  build: {
    // Build configuration can be added here
  },
  generate: {
    fallback: true // Fallback to 404.html for SPA mode
  }
}
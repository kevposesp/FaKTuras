export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Fakturas",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Fakturas make your invoices' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
        },
        {
          rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
        }
      ],
    }
  },
  devServer: {
    port: 4000,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  pinia: {
    storesDirs: ['./stores/**', './stores/**'],
  },
})

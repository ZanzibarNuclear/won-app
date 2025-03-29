// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-tiptap-editor',
    'nuxt-og-image',
    '@nuxtjs/turnstile'
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      wonServiceUrl: process.env.WON_SERVICE_URL,
    },
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY
    }
  },
  turnstile: {
    siteKey: process.env.TURNSTILE_SITE_KEY,
  },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4
  },
  tiptap: {
    prefix: 'Tiptap'
  }
})
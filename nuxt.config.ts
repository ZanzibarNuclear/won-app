// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-tiptap-editor'
  ],
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4
  },
  tiptap: {
    prefix: 'Tiptap'
  }
})
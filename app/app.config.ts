export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate',
    },
    icons: {
      light: 'i-ph-sun-duotone',
      dark: 'i-ph-moon-stars-duotone'
    },
  },
  uiPro: {
    pageSection: {
      slots: {
        title: 'dark:text-cherenkov text-graphite font-heading'
      }
    },
  }
})

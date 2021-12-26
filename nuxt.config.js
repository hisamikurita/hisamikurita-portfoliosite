import axios from 'axios'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Hisami Kurita Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'robots', name: 'robots', content: 'noindex' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/viewport.client.js',
    '~/plugins/backfaceFixed.client.js',
    '~/plugins/hambergerMenu.client.js',
    '~/plugins/siteConfig.client.js',
    '~/plugins/mixin.js',
    '~/plugins/asscroll-and-gsap.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@aceforth/nuxt-optimized-images',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    'nuxt-microcms-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/style-resources',
    '@nuxt/image',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/single.scss'
    ]
  },

  webfontloader: {
    google: {
      families: ['Six+Caps']
    }
  },

  env: {
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
  },

  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    fallback: true,
    async routes() {
      const pages = await axios
        .get(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/works?limit=100`, {
          headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
        })
        .then((res) =>
          res.data.contents.map((content) => (
            {
              route: `works/${content.id}`,
            }))
        )
      return pages
    }
  }
}
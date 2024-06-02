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
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Folio of Hisami Kurita 19/Aug.1996 (based in Tokyo and Kawasaki) frontend developer at LIG inc',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Hisami Kurita Portfolio',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://hsmkrt1996.com/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Hisami Kurita Portfolio',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Folio of Hisami Kurita 19/Aug.1996 (based in Tokyo and Kawasaki) frontend developer at LIG inc',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://hsmkrt1996.com/images/ogp.webp',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
    ],
    bodyAttrs: {
      oncontextmenu: 'return false'
    },
    script: [
      {
        hid: 'GAsrc',
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GAID}`
      },
      {
        hid: 'GAcode',
        innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.GAID}');`
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'GAsrc': ['innerHTML'],
      'GAcode': ['innerHTML']
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/viewport.client.js',
    '~/plugins/backface-fixed.client.js',
    '~/plugins/config.client.js',
    '~/plugins/asscroll-and-gsap.client.js',
    '~/plugins/constants.js',
    '~/plugins/check-device.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  loading: false,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/style-resources',
    '@nuxt/image',
    '@nuxtjs/axios',
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three'
    ],
    extend(config) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader']
      })
    },
  },

  generate: {
    async routes() {
      const generates = []

      await axios.get(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/works?limit=200`, {
          headers: {
            'X-MICROCMS-API-KEY': process.env.API_KEY
          }
        })
        .then((res) => {
          res.data.contents.map((content) => {
            return generates.push({
              route: 'works/' + content.id,
            })
          })
        })
      return generates
    }
  }
}

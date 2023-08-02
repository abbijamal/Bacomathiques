import * as dotenv from 'dotenv'
dotenv.config()

import { defineNuxtConfig } from 'nuxt/config'
import StylelintPlugin from 'vite-plugin-stylelint'
import eslintPlugin from 'vite-plugin-eslint'
import site from './site'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  runtimeConfig: {
    public: {
      debug: process.env.DEBUG === 'true'
    }
  },

  app: {
    head: {
      titleTemplate: `%s | ${site.name}`,
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { name: 'description', content: site.description },
        { name: 'theme-color', content: '#23313d' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }
      ]
    }
  },

  css: [
    '~/assets/app.scss',
    '~/node_modules/katex/dist/katex.min.css'
  ],

  vite: {
    plugins: [
      StylelintPlugin(),
      eslintPlugin()
    ]
  },

  modules: [
    '~/modules/generate-content',
    '~/modules/generate-commit-sha-file',
    '~/modules/generate-api-v2',
    '~/modules/generate-cname',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    'skimple-components/nuxt',
    '@nuxt/content',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    display: 'swap',
    families: {
      Handlee: true
    }
  },

  skimpleComponents: {
    bootstrapCss: false,
    bootstrapJs: false
  },

  sitemap: {
    siteUrl: site.host,
    trailingSlash: true
  },

  cname: {
    hostname: site.host
  }
})

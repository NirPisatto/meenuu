// https://nuxt.com/docs/api/configuration/nuxt-config

import type {ThemeDefinition} from "vuetify";

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#5581B0',
    'primary-darken-1': '#27639c',
    secondary: 'rgba(85,129,176,0.6)',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', ['@nuxtjs/google-fonts', {
    families: {
      Abel: true,
      Roboto: true,
      Lato: true,
      'Noto Sans Khmer': true,
    }
  }], 'nuxt-aos', '@nuxtjs/i18n', '@pinia/nuxt'],
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  vuetify: {
    moduleOptions: {
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light,
        },
      },
    }
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseToken: process.env.SUPABASE_KEY || '',
    public:{
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseToken: process.env.SUPABASE_KEY || '',
    }
  },
})
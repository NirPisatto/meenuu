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
    }
  }]],
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
  }
})
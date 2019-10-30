import pkg from './package'
require('dotenv').config();
const {authdmain, clientid} = process.env;


export default {
  mode: 'universal',
  env: {
    authdmain,
    clientid
  },

  server: {
    port: 8000, // デフォルト: 3000
    host: '0.0.0.0' // デフォルト: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',

  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  auth: {
    strategies: {
      auth0: {
        domain: authdmain,  // fixme これもだぞ
        client_id: clientid  // fixme apikeyはenvに描こうな
      }
    },
    redirect: {
      login: '/',  // 未ログイン時のリダイレクト先
      logout: '/logout',  // ログアウト処理を実行した直後のリダイレクト先
      callback: '/callback',  // コールバックURL
      home: '/mypage',  // ログイン後に遷移するページ
    },
  }
}

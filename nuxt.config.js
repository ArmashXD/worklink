/**
 * adding envintonuxt config
 */
require('dotenv').config();

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            // {
            //     src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCilG0NFHcCs45rvnN1jy2DBzzET8Dyc48&libraries=places',
            // }
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
        "@/assets/css/style.scss"
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: ['@/plugins/axios',
        { src: '~/plugins/localStorage.js' },
        '@/plugins/ant-design-vue',
        { src: '@/plugins/google-maps.js', ssr: true },
        { src: '@/plugins/google-analytics.js', mode: 'client' },
        { src: '@/plugins/echo.js', ssr: false },
    ],

    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/laravel-echo',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        'vue-social-sharing/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/sitemap',
        [
            '@nuxtjs/component-cache',
            {
                max: 10000,
                maxAge: 1000 * 60 * 60
            }
        ]
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        },
        transpile: [/^vue2-google-maps($|\/)/, 'vue-google-autocomplete'],
        analyze: true,
        // or
        analyze: {
            analyzerMode: 'static'
        }, html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true
            }
        }
    },
    router: {
        base: '/',
        middleware: ['authenticated'],
    },
    env: {
        baseUrl: process.env.VUE_APP_BASEURL,
        api: process.env.VUE_APP_API_ENDPOINT,
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        grant_type: process.env.VUE_APP_GRANT_TYPE,
    },
    sitemap: {
        exclude: [
            '/User/**'
        ]
    }
}

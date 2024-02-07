export default defineNuxtConfig({
	devtools: { enabled: true },
	router: {},
	app: {
		// layoutTransition: { name: 'layout', mode: 'out-in' },
		pageTransition: { name: 'page', mode: 'default' },
		head: {
			title: 'Salom Hayot',
			meta: [
				{ 'http-equiv': 'Cache-Control', content: 'no-store' },
				{ name: 'description', content: 'Salom Hayot' },
				{ name: 'theme-color', content: '#ffffff' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ charset: 'utf-8' },
				{ name: 'Accept-Language', content: 'ru' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
				{ name: 'apple-mobile-web-app-title', content: 'Salom Hayot' },
				{ name: 'mobile-web-app-capable', content: 'yes' },
				{ name: 'application-name', content: 'Salom Hayot' },
				{ name: 'msapplication-TileColor', content: '#da532c' },
				{
					name: 'msapplication-TileImage',
					content: '/favicon/mstile-150x150.png',
				},
				{
					name: 'msapplication-config',
					content: '/favicon/browserconfig.xml',
				},
				{ name: 'msapplication-navbutton-color', content: '#ffffff' },
				{ name: 'msapplication-starturl', content: '/' },
			],
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
				},
				{
					rel: 'apple-touch-icon',
					size: '180x180',
					type: 'image/png',
					href: '/favicon/apple-touch-icon.png',
				},
				{
					rel: 'icon',
					size: '32x32',
					type: 'image/png',
					href: '/favicon/favicon-32x32.png',
				},
				{
					rel: 'icon',
					size: '16x16',
					type: 'image/png',
					href: '/favicon/favicon-16x16.png',
				},
				{
					rel: 'manifest',
					href: '/favicon/site.webmanifest',
				},
			],
		},
	},

	css: [
		'modern-css-reset',
		'@/assets/css/main.scss',
		'primevue/resources/themes/lara-light-blue/theme.css',
	],
	modules: [
		'nuxt-icon',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'nuxt-swiper',
		'@nuxt/image',
		'@nuxtjs/tailwindcss',
		'vue-yandex-maps/nuxt',
	],
	plugins: [
		// {src: 'smoothscroll-for-websites', mode: 'client' }
	],
	swiper: {
		// Swiper options
		//----------------------
		prefix: 'Swiper',
		styleLang: 'scss',
		modules: ['navigation', 'pagination', 'mousewheel', 'thumbs'], // all modules are imported by default
	},
	i18n: {
		locales: [
			{
				code: 'ru',
				file: 'ru.json',
			},
			{
				code: 'uz',
				file: 'uz.json',
			},
		],
		langDir: 'locales',
		defaultLocale: 'uz',
		precompile: {
			strictMessage: false,
			escapeHtml: false,
		},
		detectBrowserLanguage: {
			// redirectOn: 'all',
			alwaysRedirect: true,
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root', // recommended
		},
	},
	// app: {
	//   pageTransition: { name: 'page', mode: 'out-in' },
	// },
	build: {
		transpile: ['primevue', 'chart.js', 'chartjs-plugin-datalabels'],
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: 'https://salomhayot.uz/api/api/v1',
			apiStorageUrl: 'https://salomhayot.uz/api/storage/',
		},
	},
	yandexMaps: {
		apikey: 'a02bbb41-937d-4aa1-9006-cfefac56ff3c',
	},
});

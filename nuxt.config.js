import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
	app: {
		head: {
			title: 'svbot-web',
			htmlAttrs: {
				lang: 'en-CH',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: "Webinterface for SVB's The Ranked Gauntlet" },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/gauntlet.50lr.webp' },
				{ href: 'https://fonts.bunny.net/css?family=Rubik' },
			],
		},
	},
	runtimeConfig: {
		public: {
			HOME_URI: process.env.HOME_URI || 'http://localhost:4001',
			API_URI: process.env.API_URL || 'http://localhost:4002',
		},
	},
	server: {
		host: '0.0.0.0',
		port: process.env.HOME_PORT || 4001,
	},
	ssr: false,
	modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/stylelint-module'],
})

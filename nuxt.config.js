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

	ssr: false,
	modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/stylelint-module'],

	nitro: {
		experimental: {
			websocket: true,
			asyncContext: true,
			openAPI: true,
		},
	},

	compatibilityDate: '2024-09-27',
})

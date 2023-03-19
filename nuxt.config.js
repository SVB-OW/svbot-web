export default {
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
			{ rel: 'preload', as: 'style', href: 'https://fonts.bunny.net/css?family=Rubik' },
		],
	},
	env: {
		MONGO_URI: process.env.MONGO_URI,
		HOME_URI: process.env.HOME_URI,
		API_URI: process.env.API_URI,
	},
	server: {
		host: '0',
		port: process.env.HOME_PORT,
	},
	ssr: false,
	target: 'server',
	components: true,
	buildModules: ['@nuxt/typescript-build'],
	plugins: ['@/plugins/ws.ts'],
}

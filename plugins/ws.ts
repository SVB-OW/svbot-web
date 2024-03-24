import type { Plugin } from '@nuxt/types'
import { io } from 'socket.io-client'
import type { Game } from '~/types'

declare module 'vue/types/vue' {
	// this.$getName inside Vue components
	interface Vue {
		$startWS(): void
		$emitWS(game: Partial<Game>): void
	}
}

declare module '@nuxt/types' {
	// nuxtContext.app.$getName inside asyncData, fetch, plugins, middleware, nuxtServerInit
	interface NuxtAppOptions {
		$startWS(): void
		$emitWS(game: Partial<Game>): void
	}
	// nuxtContext.$getName
	interface Context {
		$startWS(): void
		$emitWS(game: Partial<Game>): void
	}
}

declare module 'vuex/types/index' {
	// this.$getName inside Vuex stores
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Store<S> {
		$startWS(): void
		$emitWS(game: Partial<Game>): void
	}
}

const myPlugin: Plugin = (context, inject) => {
	inject('startWS', () => {
		const socket = io(process.env.API_URI as string, {
			transports: ['websocket', 'polling'], // use WebSocket first, if available
		})

		socket.on('game updated', (game: Partial<Game>) => {
			context.store.dispatch('currentGame/writeStore', game)
		})
	})
	inject('emitWS', (game: Partial<Game>) => {
		const socket = io(process.env.API_URI as string)
		socket.emit('game updated', game)
	})
}

export default myPlugin

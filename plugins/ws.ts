import type { Plugin } from '@nuxt/types'
import { io } from 'socket.io-client'
import type { Contestant, Game } from '~/types'

declare module 'vue/types/vue' {
	// this.$getName inside Vue components
	interface Vue {
		$subscribeGame(): void
		$publishGame(game: Partial<Game>): void
		$subscribeContestants(): void
		$publishContestants(game: Partial<Game>): void
	}
}

declare module '@nuxt/types' {
	// nuxtContext.app.$getName inside asyncData, fetch, plugins, middleware, nuxtServerInit
	interface NuxtAppOptions {
		$subscribeGame(): void
		$publishGame(game: Partial<Game>): void
		$subscribeContestants(): void
		$publishContestants(game: Partial<Game>): void
	}
	// nuxtContext.$getName
	interface Context {
		$subscribeGame(): void
		$publishGame(game: Partial<Game>): void
		$subscribeContestants(): void
		$publishContestants(game: Partial<Game>): void
	}
}

declare module 'vuex/types/index' {
	// this.$getName inside Vuex stores
	interface Store<S> {
		$subscribeGame(): void
		$publishGame(game: Partial<Game>): void
		$subscribeContestants(): void
		$publishContestants(game: Partial<Game>): void
	}
}

const myPlugin: Plugin = (context, inject) => {
	inject('subscribeGame', () => {
		const socket = io(process.env.API_URI as string, {
			transports: ['websocket', 'polling'], // use WebSocket first, if available
		})

		socket.on('game updated', (game: Partial<Game>) => {
			context.store.dispatch('currentGame/writeStore', game)
		})
	})
	inject('subscribeContestants', () => {
		const socket = io(process.env.API_URI as string, {
			transports: ['websocket', 'polling'], // use WebSocket first, if available
		})

		socket.on('contestants updated', (list: Contestant[]) => {
			context.store.dispatch('contestants/writeStore', list)
		})
	})
	inject('publishGame', (game: Partial<Game>) => {
		const socket = io(process.env.API_URI as string)
		socket.emit('game updated', game)
	})
	inject('publishContestants', (list: Contestant[]) => {
		const socket = io(process.env.API_URI as string)
		socket.emit('contestants updated', list)
	})
}

export default myPlugin

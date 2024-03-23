import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import { useCurrentGameStore } from '~/stores/currentGame'
import type { Game } from '~/types'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			startWS: () => {
				console.log('start ws from plugin')
				const socket = io(useRuntimeConfig().public.API_URI, {
					transports: ['websocket', 'polling'], // use WebSocket first, if available
				})

				socket.on('game updated', (game: Partial<Game>) => {
					console.log('received update', game)
					useCurrentGameStore().writeStore(game)
				})
			},
		},
	}
})

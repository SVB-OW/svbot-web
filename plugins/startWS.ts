import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import { useCurrentGameStore } from '~/stores/currentGame'
import type { Game } from '~/types'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			startWS: () => {
				const socket = io(useRuntimeConfig().public.API_URI, {
					transports: ['websocket', 'polling'], // use WebSocket first, if available
				})

				socket.on('game updated', (game: Partial<Game>) => {
					useCurrentGameStore().update(game)
				})
			},
		},
	}
})

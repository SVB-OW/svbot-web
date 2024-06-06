import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import type { Game } from '@/types'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			publishCurrentGame: (game: Partial<Game>) => {
				const socket = io(useRuntimeConfig().public.API_URI)
				socket.emit('game updated', game)
			},
			subscribeCurrentGame: () => {
				const socket = io(useRuntimeConfig().public.API_URI, {
					transports: ['websocket', 'polling'], // use WebSocket first, if available
				})

				socket.on('game updated', (game: Partial<Game>) => {
					const { currentGame } = useCurrentGameStore()
					Object.assign(currentGame, game)
				})
			},
		},
	}
})

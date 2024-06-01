import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import type { Game } from '~/types'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			emitWS: (game: Partial<Game>) => {
				const socket = io(useRuntimeConfig().public.API_URI)
				socket.emit('game updated', game.contestantName)
			},
		},
	}
})

import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import type { Contestant, Game } from '~/types'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			publishCurrentGame: (game: Partial<Game>) => {
				const socket = io(useRuntimeConfig().public.API_URI)
				socket.emit('game updated', game)
			},
			publishContestants: (list: Contestant[]) => {
				const socket = io(useRuntimeConfig().public.API_URI)
				socket.emit('contestants updated', list)
			},
		},
	}
})

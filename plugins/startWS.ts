import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import { useCurrentGameStore } from '~/stores/currentGame'
import type { Contestant, Game } from '~/types'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			subscribeCurrentGame: () => {
				const socket = io(useRuntimeConfig().public.API_URI, {
					transports: ['websocket', 'polling'], // use WebSocket first, if available
				})

				socket.on('game updated', (game: Partial<Game>) => {
					const { currentGame } = useCurrentGameStore()
					Object.assign(currentGame, game)
				})
			},
			subscribeContestants: () => {
				const socket = io(useRuntimeConfig().public.API_URI, {
					transports: ['websocket', 'polling'], // use WebSocket first, if available
				})

				socket.on('contestants updated', (list: Contestant[]) => {
					useContestantsStore().list = list
				})
			},
		},
	}
})

import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import { useCurrentGameStore } from '~/store/currentGame'
import type { Game } from '~/types'

export default defineNuxtPlugin(nuxtApp => {
	// now available on `nuxtApp.$injected`
	nuxtApp.provide('startWS', () => {
		const socket = io(process.env.API_URI as string, {
			transports: ['websocket', 'polling'], // use WebSocket first, if available
		})

		socket.on('game updated', (game: Partial<Game>) => {
			useCurrentGameStore().update(game)
		})
	})

	// // You can alternatively use this format, which comes with automatic type support
	// return {
	// 	provide: {
	// 		startWS: () => {
	// 			const socket = io(process.env.API_URI as string, {
	// 				transports: ['websocket', 'polling'], // use WebSocket first, if available
	// 			})

	// 			socket.on('game updated', (game: Partial<Game>) => {
	// 				useCurrentGameStore().update(game)
	// 			})
	// 		},
	// 	},
	// }
})

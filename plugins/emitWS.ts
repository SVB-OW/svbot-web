import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import { useCurrentGameStore } from '~/store/currentGame'
import type { Game } from '~/types'

// declare module '#app' {
//   interface NuxtApp {
//     $hello (msg: string): string
//   }
// }

// declare module 'vue' {
// 	interface ComponentCustomProperties {
// 		$emitWS(game: Partial<Game>): Promise<void>
// 	}
// }

export default defineNuxtPlugin(() => {
	// name: 'emitWS',
	// async setup() {
	// 	return {
	// 		provide: {
	// 			emitWS: (game: Partial<Game>) => {
	// 				const socket = io(process.env.API_URI as string)
	// 				socket.emit('game updated', game)
	// 			},
	// 		},
	// 	}
	// },

	// // You can alternatively use this format, which comes with automatic type support
	return {
		provide: {
			emitWS: (game: Partial<Game>) => {
				const socket = io(process.env.API_URI as string)
				socket.emit('game updated', game)
			},
		},
	}
})

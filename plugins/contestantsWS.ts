import { defineNuxtPlugin } from 'nuxt/app'
import { io } from 'socket.io-client'
import type { Contestant } from '@/types'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			subscribeContestants: () => {
				const socket = io(useRuntimeConfig().public.API_URI, {
					transports: ['websocket', 'polling'], // use WebSocket first, if available
				})

				socket.on('contestants updated', (list: Contestant[]) => {
					useContestantsStore().list = list
				})
			},
			publishContestants: (list: Contestant[]) => {
				const socket = io(useRuntimeConfig().public.API_URI)
				socket.emit('contestants updated', list)
			},
		},
	}
})

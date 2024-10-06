import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			subscribeSSE: async () => {
				const eventSource = new EventSource(window.location.origin + '/api/_sse')

				eventSource.onmessage = event => {
					const data = JSON.parse(event.data)
					if (data.event === 'contestants updated') {
						useContestantsStore().list = data.payload
					}
					if (data.event === 'game updated') {
						useCurrentGameStore().currentGame = data.payload
					}
				}
			},
		},
	}
})

import { defineStore } from 'pinia'
import type { Game } from '~/types'
import { Handicap } from '~/types'

export type HandicapsState = {
	list: Handicap[]
}

export const useHandicapsStore = defineStore('handicaps', {
	state: (): HandicapsState => ({
		list: [],
	}),
	getters: {
		read: state => state.list.map(item => new Handicap(item)),
	},
	actions: {
		load(game: Game) {
			this.list.forEach(h => {
				const found = game.handicaps.find(item => item.text === h.text)
				h.selected = !!found
			})
		},
	},
})

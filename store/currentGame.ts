import { defineStore } from 'pinia'
import { Contestant, Game } from '~/types'
import type { RankMultiplier } from '~/types'
import { useContestantsStore } from './contestants'
import { useBountiesStore } from './bounties'
import { useHandicapsStore } from './handicaps'
import { useRanksStore } from './ranks'
const apiEndpoint = process.env.API_URI + '/api/currentGame'

export type CurrentGameState = {
	currentGame: Game
}

export const useAuthUserStore = defineStore('currentGame', {
	state: (): CurrentGameState => ({
		currentGame: new Game(),
	}),
	getters: {
		read: state => state.currentGame,
		contestant(state) {
			const contestantsStore = useContestantsStore()
			return contestantsStore.list.find((c: Contestant) => c._id === state.currentGame.contestantId) || new Contestant()
		},
	},
	actions: {
		async read() {
			return fetch(apiEndpoint).then(res => res.json())
		},
		async load() {
			const game = await fetch(apiEndpoint).then(res => res.json())
			this.currentGame = Object.assign({}, this.currentGame, game)
			useHandicapsStore().load(this.currentGame)
			useBountiesStore().load(this.currentGame)
		},
		async update(payload: Partial<Game>) {
			const tempGame = Object.assign({}, this.currentGame, payload)
			const currentRankMultiplier = useRanksStore().list.find(
				(r: RankMultiplier) => r.name === tempGame.rank,
			)!.multiplier

			let amountHandicaps = 0
			tempGame.handicaps.forEach(h => {
				amountHandicaps += h.points * currentRankMultiplier * h.stack
			})

			const amountBounties = tempGame.bounty.points * tempGame.bounty.stack

			payload.wager = Math.floor(amountHandicaps + amountBounties)

			// this.$emitWS(payload)

			return await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})
		},
		async writeStore(payload: Partial<Game>) {
			this.currentGame = Object.assign({}, this.currentGame, payload)
		},
	},
})

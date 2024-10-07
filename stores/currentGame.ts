import { defineStore } from 'pinia'
import { Contestant, Game } from '@/types'
import type { RankMultiplier } from '@/types'
import { useContestantsStore } from './contestants'
import { useBountiesStore } from './bounties'
import { useHandicapsStore } from './handicaps'
import { useRanksStore } from './ranks'

export type CurrentGameState = {
	currentGame: Game
}

export const useCurrentGameStore = defineStore('currentGame', {
	state: (): CurrentGameState => ({
		currentGame: new Game(),
	}),
	getters: {
		contestant(state) {
			const contestantsStore = useContestantsStore()
			return contestantsStore.list.find((c: Contestant) => c._id === state.currentGame.contestantId) || new Contestant()
		},
		teamPoints(state) {
			const contestantsStore = useContestantsStore()
			return contestantsStore.read.reduce((acc: number, item: Contestant) => {
				if (state.currentGame.teamName === item.teamName) acc += item.personalBest
				return acc
			}, 0)
		},
	},
	actions: {
		async read() {
			const apiEndpoint = '/api/currentGame'
			return fetch(apiEndpoint).then(res => res.json())
		},
		async load() {
			const apiEndpoint = '/api/currentGame'
			const game: Game = await $fetch(apiEndpoint)
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

			const amountBounties = tempGame.bounty.points * tempGame.bounty.stack || 0

			payload.wager = Math.floor(amountHandicaps + amountBounties)

			const apiEndpoint = '/api/currentGame'
			return await fetch(apiEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
		},
	},
})

import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Contestant, Game } from '~/types'
import type { RankMultiplier } from '~/types'
const apiEndpoint = process.env.API_URI + '/api/currentGame'

export const state = () => ({
	currentGame: new Game(),
})

export type ContestantState = ReturnType<typeof state>

export const getters: GetterTree<ContestantState, any> = {
	read(state) {
		return state.currentGame
	},
	contestant(state, _getters, _rootState, rootGetters) {
		return (
			rootGetters['contestants/read'].find((c: Contestant) => c._id === state.currentGame.contestantId) ||
			new Contestant()
		)
	},
}

export const mutations: MutationTree<ContestantState> = {
	update(state, payload: any) {
		state.currentGame = Object.assign({}, state.currentGame, payload)
	},
}

export const actions: ActionTree<ContestantState, any> = {
	read() {
		return fetch(apiEndpoint).then(res => res.json())
	},
	async load({ commit }) {
		const game = await fetch(apiEndpoint).then(res => res.json())
		commit('update', game)
		this.dispatch('handicaps/load', game)
		this.dispatch('bounties/load', game)
	},
	async update({ state, rootGetters }, payload: Partial<Game>) {
		const tempGame = Object.assign({}, state.currentGame, payload)
		const currentRankMultiplier = rootGetters['ranks/read'].find(
			(r: RankMultiplier) => r.name === tempGame.rank,
		).multiplier

		let amountHandicaps = 0
		tempGame.handicaps.forEach(h => {
			amountHandicaps += h.points * currentRankMultiplier
		})

		payload.wager = Math.floor(amountHandicaps)

		this.$emitWS(payload)

		return await fetch(apiEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
	},
	writeStore({ commit }, payload: Partial<Game>) {
		commit('update', payload)
	},
}

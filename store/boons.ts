import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Boon } from '~/types'
import type { Game } from '~/types'

export const state = () => ({
	list: [
		new Boon({
			points: 100,
			text: 'BRING A FRIEND',
		}),
		new Boon({
			points: 40,
			text: '1.25x SPEED',
		}),
		new Boon({
			points: 40,
			text: '1.5x HP',
		}),
		new Boon({
			points: 60,
			text: '1.25x DAMAGE',
		}),
		new Boon({
			points: 25,
			text: 'BAN A HERO',
		}),
		new Boon({
			points: 25,
			text: 'COMMS',
		}),
	],
})

export type BoonState = ReturnType<typeof state>

export const getters: GetterTree<BoonState, any> = {
	read(state) {
		return state.list.map(item => new Boon(item))
	},
}

export const mutations: MutationTree<BoonState> = {
	load(state, game: Game) {
		// game.boons.forEach(b => {
		// 	const found = state.list.find(item => item.text === b.text)
		// 	if (found) found.selected = b.selected
		// })
	},
}

export const actions: ActionTree<BoonState, any> = {
	load({ commit }, game: Game) {
		commit('load', game)
	},
}

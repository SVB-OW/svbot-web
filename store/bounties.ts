import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import type { Game } from '~/types'
import { Bounty } from '~/types'

export const state = () => ({
	list: [
		new Bounty({
			points: 2,
			img: 'emote_on_dead_body.png',
			text: 'Emote on a Dead Body',
		}),
		new Bounty({
			points: 2,
			img: 'tbag_final_blow.png',
			text: 'Tbag a Final Blow',
		}),
		new Bounty({
			points: 3,
			img: 'kill_x_player.png',
			text: 'Kill X Player',
		}),
		new Bounty({
			points: 10,
			img: 'touch_spawn_doors.png',
			text: 'Touch the Spawn Doors',
		}),
	],
	selected: new Bounty(),
})

export type BountyState = ReturnType<typeof state>

export const getters: GetterTree<BountyState, any> = {
	read(state) {
		return state.list.map(item => new Bounty(item))
	},
}

export const mutations: MutationTree<BountyState> = {
	load(state, game: Game) {
		state.selected = game.bounty
	},
}

export const actions: ActionTree<BountyState, any> = {
	load({ commit }, game: Game) {
		commit('load', game)
	},
}

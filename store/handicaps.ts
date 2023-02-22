import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import type { Game } from '~/types'
import { Handicap } from '~/types'

export const state = () => ({
	list: [
		new Handicap({
			points: 50,
			img: 'no_ui.png',
			text: 'UI OFF',
		}),
		new Handicap({
			points: 175,
			img: 'rank_up_enemy.png',
			text: 'RANK UP THE ENEMY',
		}),
		new Handicap({
			points: 100,
			img: 'enemy_hp_up.png',
			text: 'ENEMY HP UP 1.25X',
		}),
		new Handicap({
			points: 35,
			img: 'chat_bans_hero.png',
			text: 'CHAT BANS A HERO',
		}),
		new Handicap({
			points: 50,
			img: 'swap_after_death.png',
			text: 'SWAP HERO AFTER DEATH',
		}),
		new Handicap({
			points: 50,
			img: 'no_sound.png',
			text: 'NO IN GAME AUDIO',
		}),
		new Handicap({
			points: 40,
			img: 'no_ult.png',
			text: "CAN'T USE ULTIMATE",
		}),
		new Handicap({
			points: 175,
			img: 'one_less_player.png',
			text: '1 LESS PLAYER',
		}),
	],
})

export type HandicapState = ReturnType<typeof state>

export const getters: GetterTree<HandicapState, any> = {
	read(state) {
		return state.list.map(item => new Handicap(item))
	},
}

export const mutations: MutationTree<HandicapState> = {
	load(state, game: Game) {
		state.list.forEach(h => {
			const found = game.handicaps.find(item => item.text === h.text)
			h.selected = !!found
		})
	},
}

export const actions: ActionTree<HandicapState, any> = {
	load({ commit }, game: Game) {
		commit('load', game)
	},
}

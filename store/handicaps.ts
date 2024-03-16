import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import type { Game } from '~/types'
import { Handicap } from '~/types'

export const state = () => ({
	list: [
		new Handicap({
			points: 80,
			img: 'w_only.png',
			text: 'W ONLY',
		}),
		new Handicap({
			points: 40,
			img: 'perma_jump.png',
			text: 'PERMANENT JUMPING',
		}),
		new Handicap({
			points: 45,
			img: '1_ult.png',
			text: 'ONLY 1 ULT PER ROUND',
		}),
		new Handicap({
			points: 45,
			img: 'chat_picks_hero.png',
			text: 'CHAT PICKS YOUR HERO',
		}),
		new Handicap({
			points: 70,
			img: '1_min_swap.png',
			text: 'SWAP HERO AFTER 1 MIN',
		}),
		new Handicap({
			points: 175,
			img: '5v6.png',
			text: 'PLAY 5V6',
		}),
		new Handicap({
			points: 175,
			img: 'rank_up_enemy.png',
			text: 'RANK UP THE ENEMY',
		}),
		new Handicap({
			points: 175,
			img: 'one_less_player.png',
			text: '1 LESS PLAYER',
		}),
		new Handicap({
			points: 60,
			img: 'respawn_timer.png',
			text: 'INCREASE RESPAWN TIMER',
		}),
		new Handicap({
			points: 90,
			img: 'nearsight.png',
			text: 'NEARSIGHT',
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

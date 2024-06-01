import { defineStore } from 'pinia'
import type { Game } from '~/types'
import { Handicap } from '~/types'

export type HandicapsState = {
	list: Handicap[]
}

export const useHandicapsStore = defineStore('handicaps', {
	state: (): HandicapsState => ({
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
				maxStack: 6,
			}),
			new Handicap({
				points: 175,
				img: 'one_less_player.png',
				text: '1 LESS PLAYER',
				maxStack: 4,
			}),
			new Handicap({
				points: 60,
				img: 'respawn_timer.png',
				text: 'INCREASE RESPAWN TIMER',
				maxStack: 3,
			}),
			new Handicap({
				points: 90,
				img: 'nearsight.png',
				text: 'NEARSIGHT',
			}),
		],
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

import { defineStore } from 'pinia'
import type { Game } from '~/types'
import { Bounty } from '~/types'

export type BountiesState = {
	list: Bounty[]
	selected: Bounty
}

export const useBountiesStore = defineStore('bounties', {
	state: (): BountiesState => ({
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
	}),
	getters: {
		read: state => state.list.map(item => new Bounty(item)),
	},
	actions: {
		load(game: Game) {
			this.selected = game.bounty
		},
	},
})

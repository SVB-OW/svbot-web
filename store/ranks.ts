import type { GetterTree } from 'vuex'
import type { RankMultiplier } from '~/types'

export const state = () => ({
	list: <RankMultiplier[]>[
		{ name: 'bronze', multiplier: 1 },
		{ name: 'silver', multiplier: 1.2 },
		{ name: 'gold', multiplier: 1.4 },
		{ name: 'platinum', multiplier: 1.6 },
		{ name: 'diamond', multiplier: 1.8 },
		{ name: 'master', multiplier: 2 },
		{ name: 'grandmaster', multiplier: 2.2 },
	],
})

export type RankState = ReturnType<typeof state>

export const getters: GetterTree<RankState, any> = {
	read(state) {
		return state.list
	},
}

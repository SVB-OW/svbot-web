import { defineStore } from 'pinia'
import type { RankMultiplier } from '~/types'

export type RanksState = {
	list: RankMultiplier[]
}

export const useRanksStore = defineStore('ranks', {
	state: (): RanksState => ({
		list: <RankMultiplier[]>[
			{ name: 'bronze', multiplier: 1 },
			{ name: 'silver', multiplier: 1.2 },
			{ name: 'gold', multiplier: 1.4 },
			{ name: 'platinum', multiplier: 1.6 },
			{ name: 'diamond', multiplier: 1.8 },
			{ name: 'master', multiplier: 2 },
			{ name: 'grandmaster', multiplier: 2.2 },
		],
	}),
})

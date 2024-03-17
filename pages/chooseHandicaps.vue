<template>
	<main>
		<header>
			<h1>Choose Your Handicaps</h1>
			<img src="gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<div class="split-view">
			<div class="left">
				<h2>
					CONTESTANT: {{ currentContestant.name }}
					{{ currentContestant.personalBest }}
					<img src="points.png" alt="points" width="20px" />
				</h2>

				<button @click="defeat">DEFEAT</button>
				<button @click="victory">VICTORY</button>

				<br /><br />

				<div class="handicaps-list">
					<div
						v-for="(item, i) in allHandicaps"
						:key="i"
						class="handicap-item"
						:class="{ selected: selectedHandicap(item) }"
						@click="toggleHandicap(item)"
					>
						<img :src="selectedHandicap(item) ? 'points_black.png' : 'points.png'" alt="Points" class="points" />

						{{ Math.floor(item.points * rankMultiplier) }}

						<div class="spacer"></div>

						<img :src="'handicaps/' + (selectedHandicap(item) ? 'black/' : 'orange/') + item.img" :alt="item.text" />

						<div class="spacer"></div>

						<span>{{ item.text }}</span>

						<div class="flex-spacer"></div>

						<button v-if="item.maxStack > 1 && selectedHandicap(item)?.stack > 1" @click.stop="updateStack(item, -1)">
							-
						</button>
						<div class="spacer"></div>
						<span v-if="selectedHandicap(item)?.stack > 1">
							{{ selectedHandicap(item)?.stack }}
						</span>
						<div class="spacer"></div>
						<button
							v-if="item.maxStack > 1 && selectedHandicap(item)"
							:disabled="selectedHandicap(item)?.stack >= item.maxStack"
							@click.stop="updateStack(item, 1)"
						>
							+
						</button>
					</div>
				</div>

				<div class="bounties">
					<div v-for="(item, i) in allBounties" :key="i" @click="selectBounty(item)">
						<img :src="'bounties/' + (item.text === currentGame.bounty.text ? 'on/' : 'off/') + item.img" alt="" />
						<input
							v-if="item.text === currentGame.bounty.text"
							:value="currentGame.bounty.stack"
							@input="updateBounty"
							@click.stop
							type="number"
							min="0"
						/>
					</div>
				</div>
			</div>

			<div class="right current-wager">
				<h2>CURRENT WAGER</h2>

				<img :src="'ranks/white/' + currentGame.rank + '.png'" alt="Selected Rank Icon" />

				<div class="amount">
					<img src="points.png" alt="Points Icon" />
					{{ currentGame.wager }}
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import type { Bounty, Handicap, Rank } from '@/types'
import { Game } from '@/types'

export default Vue.extend({
	computed: {
		...mapState({
			currentBounty: 'bounties/selected',
		}),
		...mapGetters({
			allRanks: 'ranks/read',
			allHandicaps: 'handicaps/read',
			allBounties: 'bounties/read',
			currentGame: 'currentGame/read',
			currentContestant: 'currentGame/contestant',
		}),
		rankMultiplier(): number {
			return this.allRanks.find((r: Rank) => r === this.currentGame.rank)?.multiplier || 1
		},
	},
	methods: {
		...mapActions({
			updateContestant: 'contestants/update',
			updateCurrentGame: 'currentGame/update',
		}),
		victory(): void {
			this.currentContestant[this.currentGame.rank + 'Points'] = this.currentGame.wager
			this.currentContestant.personalBest = Math.max(this.currentContestant.personalBest, this.currentGame.wager)

			this.updateContestant(this.currentContestant)

			this.$router.push('/')
			this.resetCurrentGame()
		},
		defeat(): void {
			this.currentContestant.bronzePoints = 0
			this.currentContestant.silverPoints = 0
			this.currentContestant.goldPoints = 0
			this.currentContestant.platinumPoints = 0
			this.currentContestant.diamondPoints = 0
			this.currentContestant.masterPoints = 0
			this.currentContestant.grandmasterPoints = 0

			this.currentContestant[this.currentGame.rank + 'Points'] =
				this.currentGame.bounty.points * this.currentGame.bounty.stack
			this.currentContestant.personalBest = Math.max(
				this.currentContestant.personalBest,
				this.currentGame.bounty.points * this.currentGame.bounty.stack,
			)

			this.updateContestant(this.currentContestant)

			this.$router.push('/')
			this.resetCurrentGame()
		},
		toggleHandicap(handicap: Handicap): void {
			if (this.selectedHandicap(handicap)) {
				// Remove handicap text from currentGame
				this.updateCurrentGame({
					handicaps: (this.currentGame as Game).handicaps.filter(h => h.text !== handicap.text),
				})
			} else {
				// Add handicap text to currentGame
				this.updateCurrentGame({
					handicaps: [...(this.currentGame as Game).handicaps, { ...handicap, stack: 1 }],
				})
			}
		},
		updateStack(handicap: Handicap, stack: number): void {
			const newHandicaps = (this.currentGame as Game).handicaps
				.map(h => ({ ...h })) // Remove refs
				.map(h => {
					if (h.text === handicap.text) h.stack += stack
					return h
				})

			this.updateCurrentGame({ handicaps: newHandicaps })
		},
		selectBounty(bounty: Bounty): void {
			this.updateCurrentGame({ bounty })
		},
		selectedHandicap(handicap: Handicap): Handicap | undefined {
			return (this.currentGame as Game).handicaps.find(h => h.text === handicap.text)
		},
		selectedBounty(): Bounty | undefined {
			return this.currentGame.bounty
		},
		updateBounty(event: Event): void {
			const stack = parseInt((event.target as HTMLInputElement).value)
			this.updateCurrentGame({ ...this.currentGame, bounty: { ...this.currentGame.bounty, stack } })
		},
		resetCurrentGame(): void {
			this.updateCurrentGame(new Game())
		},
	},
})
</script>

<style scoped>
h2 {
	font-weight: initial;
}

.split-view {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.split-view .handicaps-list {
	user-select: none;
}

.split-view .handicaps-list .handicap-item {
	height: 30px;
	display: flex;
	line-height: 30px;
	margin: 0 0 0.5rem;
	transition: 0.3s ease;
	clip-path: polygon(0 0, calc(100% - 25px) 0, 100% 100%, 0 100%);
	padding-right: 40px;
}

.split-view .handicaps-list .handicap-item.selected {
	background-color: var(--main-color);
	color: black;
}

.split-view .bounties {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 10px;
	width: 100%;
	margin-top: 50px;
}

.split-view .bounties img {
	object-fit: contain;
	width: 100%;
	aspect-ratio: 1/1;
}

.split-view .current-wager img {
	height: 75px;
	object-fit: contain;
}

.split-view .handicaps-list .handicap-item img {
	padding: 3px;
	width: 30px;
	object-fit: contain;
}

.split-view .handicaps-list .handicap-item img.points {
	width: 20px;
}

.split-view .handicaps-list .handicap-item button {
	margin: 3px 0;
	height: calc(100% - 6px);
	padding: 0;
	aspect-ratio: 1 / 1;
	background: var(--main-bg);
}

.split-view .current-wager {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.split-view .current-wager .amount {
	font-size: 24px;
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.split-view .current-wager .amount img {
	height: 32px;
	margin-right: 16px;
}

.spacer {
	width: 10px;
}

.flex-spacer {
	flex: 1 1 auto;
}
</style>

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

				<!-- <div class="boons-grid">
          <button
            v-for="boon in allBoons"
            :key="boon.text"
            @click="currentGame.boons.push({ ...boon })"
            :disabled="currentTotal < Math.floor(boon.points * rankMultiplier)"
          >
            {{ boon.text }} {{ Math.floor(boon.points * rankMultiplier) }}
            <img src="points_black.png" alt="points" width="15px" />
          </button>
        </div> -->

				<button @click="defeat">DEFEAT</button>
				<button @click="victory">VICTORY</button>

				<br /><br />

				<div class="handicaps-list">
					<div
						v-for="(item, i) in allHandicaps"
						:key="i"
						class="handicap-item"
						:class="{ selected: isSelected(item) }"
						@click="toggleHandicap(item)"
					>
						<img :src="isSelected(item) ? 'points_black.png' : 'points.png'" alt="Points" class="points" />

						{{ Math.floor(item.points * rankMultiplier) }}

						<div class="spacer"></div>

						<img :src="'handicaps/' + (isSelected(item) ? 'black/' : 'orange/') + item.img" :alt="item.text" />

						<div class="spacer"></div>

						<span>{{ item.text }}</span>
					</div>
				</div>

				<div class="bounties">
					<div v-for="(item, i) in allBounties" :key="i" @click="selectBounty(item)">
						<img :src="'bounties/' + (item.text === currentGame.bounty.text ? 'on/' : 'off/') + item.img" alt="" />
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

				<br />

				<!-- <div v-if="currentGame.boons.length" class="boons-cart">
          <h4>BOONS CART</h4>

          <div v-for="(boon, i) in currentGame.boons" :key="i">
            <span>
              {{ boon.text }} {{ boon.points }}
              <img src="points.png" alt="Points Icon" />
            </span>
            <button @click="currentGame.boons = currentGame.boons.filter((b: Boon) => b.stack !== boon.stack)">
              X
            </button>
          </div>
        </div> -->
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import type { Boon, Bounty, Handicap, Rank } from '@/types'
import { Game } from '@/types'

export default Vue.extend({
	computed: {
		...mapState({
			currentBounty: 'bounties/selected',
		}),
		...mapGetters({
			allRanks: 'ranks/read',
			allHandicaps: 'handicaps/read',
			allBoons: 'boons/read',
			allBounties: 'bounties/read',
			currentGame: 'currentGame/read',
			currentContestant: 'currentGame/contestant',
		}),
		rankMultiplier(): number {
			return this.allRanks.find((r: Rank) => r === this.currentGame.rank)?.multiplier || 1
		},
		currentTotal(): number {
			const amountHandicaps = Math.floor(
				this.allHandicaps
					.filter((h: Handicap) => h.selected)
					.reduce((accumulator: number, currentValue: Handicap) => {
						return accumulator + currentValue.points
					}, 0) * this.rankMultiplier,
			)

			const amountBoons = Math.floor(
				this.currentGame.boons.reduce((accumulator: number, currentValue: Boon) => {
					return accumulator + currentValue.points
				}, 0) * this.rankMultiplier,
			)

			return amountHandicaps - amountBoons
		},
	},
	// async beforeMount(): Promise<void> {
	//   const currentRun = await this.currentGame()
	//   console.log('currentRun beforeMount chooseHandicaps', currentRun)

	//   this.currentContestant =
	//     this.allContestants.find((c: Contestant) => c._id === currentRun.contestantId) || new Contestant()
	//   this.rank = currentRun.rank
	//   this.handicaps = [...this.allHandicaps]

	//   this.handicaps.forEach((item: { selected: any; text: string }) => {
	//     item.selected = currentRun.handicaps.find((h: Handicap) => h.text === item.text)
	//   })
	// },
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

			this.updateContestant(this.currentContestant)

			this.$router.push('/')
			this.resetCurrentGame()
		},
		toggleHandicap(handicap: Handicap): void {
			if (this.isSelected(handicap)) {
				// Remove handicap text from currentGame
				this.updateCurrentGame({
					handicaps: (this.currentGame as Game).handicaps.filter(h => h.text !== handicap.text),
				})
			} else {
				// Add handicap text to currentGame
				this.updateCurrentGame({
					handicaps: [...(this.currentGame as Game).handicaps, handicap],
				})
			}
		},
		selectBounty(bounty: Bounty): void {
			this.updateCurrentGame({ bounty })
		},
		isSelected(handicap: Handicap): boolean {
			return (this.currentGame as Game).handicaps.some(h => h.text === handicap.text)
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

.split-view .boons-grid {
	margin: 10px 0;
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
}

.split-view .handicaps-list .handicap-item.selected {
	background-color: #ff9d16;
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

.split-view .boons-cart {
	width: 100%;
	padding: 0 20%;
}

.split-view .boons-cart div {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
}

.split-view .current-wager img {
	height: 75px;
	object-fit: contain;
}

.split-view .boons-cart div img {
	height: 15px;
	width: 15px;
}

.split-view .handicaps-list .handicap-item img {
	padding: 3px;
	width: 30px;
	object-fit: contain;
}

.split-view .handicaps-list .handicap-item img.points {
	width: 20px;
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
</style>

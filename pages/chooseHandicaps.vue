<template>
	<main>
		<header>
			<h1>Choose Your Handicaps</h1>
			<img src="/gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<div class="split-view">
			<div class="left">
				<h2>
					CONTESTANT: {{ currentContestant.name }}
					{{ currentContestant.personalBest }}
					<img src="/points.png" alt="points" width="20px" />
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
						<img :src="selectedHandicap(item) ? '/points_black.png' : '/points.png'" alt="Points" class="points" />

						{{ Math.floor(item.points * rankMultiplier()) }}

						<div class="spacer" />

						<img :src="'handicaps/' + (selectedHandicap(item) ? 'black/' : 'orange/') + item.img" :alt="item.text" />

						<div class="spacer" />

						<span>{{ item.text }}</span>

						<div class="flex-spacer" />

						<button
							v-if="item.maxStack > 1 && selectedHandicap(item) && selectedHandicap(item)!.stack > 1"
							@click.stop="updateStack(item, -1)"
						>
							-
						</button>
						<div class="spacer" />
						<span v-if="selectedHandicap(item) && selectedHandicap(item)!.stack > 1">
							{{ selectedHandicap(item)!.stack }}
						</span>
						<div class="spacer" />
						<button
							v-if="item.maxStack > 1 && selectedHandicap(item)"
							:disabled="selectedHandicap(item)!.stack >= item.maxStack"
							@click.stop="updateStack(item, 1)"
						>
							+
						</button>
					</div>
				</div>

				<div class="bounties">
					<div v-for="(item, i) in allBounties" :key="i" :title="item.text" @click="selectBounty(item)">
						<img :src="'bounties/' + (item.text === currentGame.bounty.text ? 'on/' : 'off/') + item.img" alt="" />
						<input
							v-if="item.text === currentGame.bounty.text"
							:value="currentGame.bounty.stack"
							type="number"
							min="0"
							@input="updateBounty"
							@click.stop
						/>
					</div>
				</div>
			</div>

			<div class="right current-wager">
				<h2>CURRENT WAGER</h2>

				<img :src="'/ranks/white/' + currentGame.rank + '.png'" alt="Selected Rank Icon" />

				<div class="amount">
					<img src="/points.png" alt="Points Icon" />
					{{ currentGame.wager }}
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import type { Bounty, Handicap } from '@/types'
import { Game } from '@/types'

const { list: allBounties } = storeToRefs(useBountiesStore())
const { list: allHandicaps } = storeToRefs(useHandicapsStore())
const { list: allRanks } = storeToRefs(useRanksStore())
const { currentGame, contestant: currentContestant } = storeToRefs(useCurrentGameStore())
const { update: updateCurrentGame } = useCurrentGameStore()
const { update: updateContestant } = useContestantsStore()

function victory(): void {
	currentContestant.value[currentGame.value.rank + 'Points'] = currentGame.value.wager
	currentContestant.value.personalBest = Math.max(currentContestant.value.personalBest, currentGame.value.wager)

	updateContestant(currentContestant.value)

	navigateTo('/')
	resetCurrentGame()
}

function rankMultiplier(): number {
	return allRanks.value.find(r => r.name === currentGame.value.rank)?.multiplier || 1
}

function defeat(): void {
	currentContestant.value.bronzePoints = 0
	currentContestant.value.silverPoints = 0
	currentContestant.value.goldPoints = 0
	currentContestant.value.platinumPoints = 0
	currentContestant.value.diamondPoints = 0
	currentContestant.value.masterPoints = 0
	currentContestant.value.grandmasterPoints = 0

	currentContestant.value[currentGame.value.rank + 'Points'] =
		currentGame.value.bounty.points * currentGame.value.bounty.stack
	currentContestant.value.personalBest = Math.max(
		currentContestant.value.personalBest,
		currentGame.value.bounty.points * currentGame.value.bounty.stack,
	)

	updateContestant(currentContestant.value)

	navigateTo('/')
	resetCurrentGame()
}

function toggleHandicap(handicap: Handicap): void {
	if (selectedHandicap(handicap)) {
		// Remove handicap text from currentGame
		updateCurrentGame({
			handicaps: currentGame.value.handicaps.filter(h => h.text !== handicap.text),
		})
	} else {
		// Add handicap text to currentGame
		handicap.stack = 1
		updateCurrentGame({
			handicaps: [...currentGame.value.handicaps, handicap],
		})
	}
}

function updateStack(handicap: Handicap, stack: number): void {
	const newHandicaps = currentGame.value.handicaps.map(h => {
		if (h.text === handicap.text) h.stack += stack
		return h
	})

	updateCurrentGame({ handicaps: newHandicaps })
}

function selectBounty(bounty: Bounty): void {
	updateCurrentGame({ bounty })
}

function selectedHandicap(handicap: Handicap): Handicap | undefined {
	return currentGame.value.handicaps.find(h => h.text === handicap.text)
}

function updateBounty(event: Event): void {
	const stack = parseInt((event.target as HTMLInputElement).value)
	updateCurrentGame({ ...currentGame.value, bounty: { ...currentGame.value.bounty, stack } })
}

function resetCurrentGame(): void {
	updateCurrentGame(new Game())
}
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

.split-view .bounties input {
	width: 100%;
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

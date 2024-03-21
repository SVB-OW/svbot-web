<template>
	<main>
		<header>
			<h1>Choose Your Rank</h1>
			<img src="/gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<div class="ranks-grid">
			<div class="row">
				<div
					v-for="(rank, i) in allRanks.slice(0, 4)"
					:key="i"
					class="rank-item"
					:class="{ complete: currentContestant[rank.name + 'Points'] > 0 }"
					@click="selectRank(rank.name)"
				>
					<div v-if="currentContestant[rank.name + 'Points'] === 0">x{{ rank.multiplier }}</div>
					<div v-else>{{ currentContestant[rank.name + 'Points'] }}</div>
					<img :src="'ranks/white/' + rank.name + '.png'" alt="Rank Icon" />
				</div>
			</div>
			<div class="row">
				<div
					v-for="(rank, i) in allRanks.slice(4)"
					:key="i"
					class="rank-item"
					:class="{ complete: currentContestant[rank.name + 'Points'] > 0 }"
					@click="selectRank(rank.name)"
				>
					<div v-if="currentContestant[rank.name + 'Points'] === 0">x{{ rank.multiplier }}</div>
					<div v-else>{{ currentContestant[rank.name + 'Points'] }}</div>
					<img :src="'ranks/white/' + rank.name + '.png'" alt="Rank Icon" />
				</div>
			</div>

			<div class="small-row">
				<div
					v-for="(rank, i) in allRanks"
					:key="i"
					class="rank-item-small"
					:class="{ selected: currentGame.rank2 === rank.name }"
					@click="selectRank2(rank.name)"
				>
					<img :src="'ranks/white/' + rank.name + '.png'" alt="Rank Icon" />
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { Rank } from '~/types'

const { list: allRanks } = useRanksStore()
const { currentGame, contestant: currentContestant, update: updateCurrentGame } = useCurrentGameStore()

function selectRank(rank: Rank): void {
	currentGame.rank = rank
	currentGame.rank2 = currentGame.rank2 === Rank.bronze ? rank : currentGame.rank2
	navigateTo('/chooseHandicaps')
}

function selectRank2(rank2: Rank): void {
	currentGame.rank2 = rank2
}
</script>

<style scoped>
.ranks-grid {
	font-size: 24px;
	font-weight: bold;
	margin: 0 25vw;
}

.ranks-grid .row {
	display: flex;
	justify-content: center;
	width: 100%;
}

.ranks-grid .small-row {
	display: flex;
	width: 100%;
}

.ranks-grid .rank-item {
	text-align: center;
	margin: 1rem;
}

.ranks-grid .rank-item-small {
	text-align: center;
	margin: 1rem;
	display: inline-flex;
}

.ranks-grid .rank-item.complete,
.ranks-grid .rank-item-small.selected {
	opacity: 0.5;
	pointer-events: none;
}

.ranks-grid .rank-item img {
	height: 75px;
	width: 85px;
	object-fit: scale-down;
	margin: 0.5rem 0 0;
}

.ranks-grid .rank-item-small img {
	width: 100%;
	object-fit: contain;
	margin: 0.5rem 0 0;
}
</style>
~/stores/currentGame~/stores/ranks

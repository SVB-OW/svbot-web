<template>
	<div class="overlay">
		<link rel="preconnect" href="https://fonts.bunny.net" />
		<link href="https://fonts.bunny.net/css2?family=Rubik&display=swap" rel="stylesheet" />

		<div class="handicaps">
			<img
				v-for="(handicap, i) in currentGame.handicaps"
				:key="i"
				:src="`/handicaps/orange/${handicap.img}`"
				class="handicap"
			/>
		</div>
		<div class="team1-name text-box">
			{{ currentGame.contestantName }}
			<img class="bounty" :src="`bounties/on/${currentGame.bounty.img}`" />
		</div>
		<div class="team1-icon"><img :src="`/ranks/orange/${currentGame.rank}.png`" /></div>

		<div class="header-center text-box">
			Wager: {{ currentGame.wager }} <img src="/points.png" class="wager-icon" />
		</div>

		<div class="team2-name text-box">
			{{ currentGame.rank2.charAt(0).toUpperCase() + currentGame.rank2.slice(1) }}
			Team
		</div>
		<div class="team2-icon"><img :src="`/ranks/orange/${currentGame.rank2}.png`" /></div>

		<div class="footer-left text-box">
			{{ currentGame.contestantName }}: {{ contestant.personalBest }}
			<img src="/points.png" class="wager-icon" />
		</div>
		<div class="footer-right text-box">
			<img src="/svb-side.png" alt="SVB Side" />
		</div>

		<pre
			style="
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 600px;
				background-color: lightblue;
				color: black;
			"
			>{{ currentGame }}</pre
		>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'empty',
})

const { load: loadContestants } = useContestantsStore()
const { load: loadCurrentGame } = useCurrentGameStore()
const { currentGame, contestant } = storeToRefs(useCurrentGameStore())

onMounted(async () => {
	await loadContestants()
	await loadCurrentGame()
	useNuxtApp().$startWS()
})
</script>

<style>
* {
	box-sizing: border-box;
	font-family: Rubik, sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 26px;
	color: white;
}

html {
	background: transparent;
}

body {
	margin: 0;
}

.text-box {
	/* border: 1px dashed white; */
	display: flex;
	align-items: center;
	justify-content: center;
	line-height: 30px;
}

.overlay {
	background: grey;
	background: url('/overlay_background.png');
	width: 1920px;
	height: 1080px;
	position: relative;
}

.handicaps {
	padding-top: 1px;
	padding-left: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 52px;
}

.handicap {
	width: 40px;
	height: 40px;
	margin-right: 5px;
}

.bounty {
	margin-top: 4px;
	margin-right: 15px;
	height: 45px;
	display: inline-flex;
}

.team1-name {
	position: absolute;
	top: 1px;
	left: 405px;
	width: 200px;
	height: 52px;
	direction: rtl;
	justify-content: start;
}

.team1-icon {
	position: absolute;
	top: 4px;
	left: 628.8px;
	width: 65.2px;
	height: 45px;
	padding: 7.5px;
	display: inline-flex;
}

.team2-name {
	position: absolute;
	top: 1px;
	left: 1310px;
	width: 300px;
	height: 52px;
	justify-content: start;
}

.team2-icon {
	position: absolute;
	top: 4px;
	left: 1834.8px;
	width: 65.2px;
	height: 45px;
	padding: 7.5px;
}

.team2-icon img {
	height: 100%;
}

.wager-icon {
	width: 1em;
	height: 1em;
	margin: 0 5px;
}

.header-center {
	position: absolute;
	top: 3px;
	left: 800px;
	width: 325px;
	height: 20px;
}

.header-center .wager-icon {
	width: 20px;
	height: 20px;
}

.footer-left {
	position: absolute;
	top: 1028px;
	left: 595px;
	width: 300px;
	height: 51px;
	justify-content: end;
}

.footer-right {
	position: absolute;
	top: 1028px;
	left: 1025px;
	width: 300px;
	height: 51px;
	justify-content: start;
}

.footer-right img {
	height: 75%;
}
</style>

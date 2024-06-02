<template>
	<div>
		<a href="/stream-elements/leaderboard">Leaderboard W:340 H:400</a>
		<TheLeaderboard standalone />

		<a href="/stream-elements/handicaps">Handicaps Horizontal Icons</a>
		<TheHandicaps :handicaps="currentGame.handicaps" />

		<a href="/stream-elements/handicaps-vertical">Handicaps Vertical List</a>
		<TheHandicapsVertical :handicaps="currentGame.handicaps" />

		<a href="/stream-elements/rank-team1">Rank Team 1</a>
		<GenericIcon src="/ranks/orange/bronze.png" />

		<a href="/stream-elements/top-bar">Top Bar W:1920 H:54</a>
		<TheTopBar :current-game="currentGame" />
	</div>
</template>

<script setup lang="ts">
const { currentGame } = storeToRefs(useCurrentGameStore())

const { load: loadContestants } = useContestantsStore()
const { load: loadCurrentGame } = useCurrentGameStore()

definePageMeta({
	layout: 'empty',
})

onMounted(async () => {
	await loadContestants()
	await loadCurrentGame()
	useNuxtApp().$subscribeCurrentGame()
})
</script>

<style>
a {
	margin: 1rem 0;
	display: block;
}

.icon {
	border: 1px solid black;
}
</style>

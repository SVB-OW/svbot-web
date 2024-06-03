<!-- 
	Examples:
	http://localhost:4001/stream-elements/the-leaderboard
	http://localhost:4001/stream-elements/the-handicaps
	http://localhost:4001/stream-elements/the-handicaps-vertical
	http://localhost:4001/stream-elements/the-top-bar
 -->
<template>
	<div>
		<the-handicaps v-if="route.params.slug === 'the-handicaps'" :handicaps="currentGame.handicaps" />
		<the-handicaps-vertical v-if="route.params.slug === 'the-handicaps-vertical'" :handicaps="currentGame.handicaps" />
		<the-leaderboard v-if="route.params.slug === 'the-leaderboard'" :contestants="allContestants" />
		<the-top-bar v-if="route.params.slug === 'the-top-bar'" :current-game="currentGame" />
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const { list: allContestants } = storeToRefs(useContestantsStore())
const { currentGame } = storeToRefs(useCurrentGameStore())

const { load: loadContestants } = useContestantsStore()
const { load: loadCurrentGame } = useCurrentGameStore()

onMounted(async () => {
	await loadContestants()
	await loadCurrentGame()
	useNuxtApp().$subscribeCurrentGame()
	useNuxtApp().$subscribeContestants()
})

definePageMeta({
	layout: 'empty',
})

useHead({
	title: 'Stream Element ' + route.params.slug,
})
</script>

<style>
body {
	margin: 0;
}
</style>

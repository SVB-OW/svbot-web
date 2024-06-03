<!-- 
	Examples:
	http://localhost:4001/stream-elements/leaderboard?contestants=allContestants
	http://localhost:4001/stream-elements/handicaps?handicaps=currentHandicaps
	http://localhost:4001/stream-elements/handicaps-vertical?handicaps=currentHandicaps
	http://localhost:4001/stream-elements/top-bar?currentGame=currentGame
 -->
<template>
	<div>
		<component :is="renderComponent" v-bind="args" />
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

const components = {
	leaderboard: resolveComponent('the-leaderboard'),
	handicaps: resolveComponent('TheHandicaps'),
	'handicaps-vertical': resolveComponent('TheHandicapsVertical'),
	'top-bar': resolveComponent('TheTopBar'),
}

const currentHandicaps = computed(() => currentGame.value.handicaps)

const data: { [string: string]: Ref } = {
	allContestants,
	currentHandicaps,
	currentGame,
}

const renderComponent = computed(() => {
	return components[route.params.slug as keyof typeof components]
})

const args = computed(() => {
	return Object.fromEntries(
		Object.entries(route.query).map(([key, value]) => [key, unref(data[value as keyof typeof data])]),
	)
})
</script>

<style>
body {
	margin: 0;
}
</style>

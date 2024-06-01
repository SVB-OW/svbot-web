<template>
	<div class="handicaps">
		<img
			v-for="(handicap, i) in currentGame.handicaps"
			:key="i"
			:src="`handicaps/orange/${handicap.img}`"
			class="handicap"
		/>
	</div>
</template>

<script setup lang="ts">
const { currentGame } = storeToRefs(useCurrentGameStore())

definePageMeta({
	layout: 'empty',
})

onMounted(async () => {
	await useCurrentGameStore().load()
	useNuxtApp().$subscribeCurrentGame()
})
</script>

<style scoped>
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
</style>

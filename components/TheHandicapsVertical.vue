<template>
	<div class="handicaps">
		<div v-for="(handicap, i) in currentGame.handicaps" :key="i" class="handicap">
			<img :src="`handicaps/orange/${handicap.img}`" />
			<span>{{ handicap.text }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
const { currentGame } = storeToRefs(useCurrentGameStore())

definePageMeta({
	layout: 'empty',
})
</script>

<style scoped>
.handicaps {
	padding-top: 1px;
	padding-left: 20px;
}

.handicap {
	display: flex;
	align-items: center;
}

.handicap img {
	width: 40px;
	height: 40px;
	margin-right: 5px;
}
</style>

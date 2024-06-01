<template>
	<div class="icon"><img :src="`ranks/orange/${currentGame.rank}.png`" /></div>
</template>

<script setup lang="ts">
const { currentGame } = storeToRefs(useCurrentGameStore())

definePageMeta({
	layout: 'empty',
})
</script>

<style scoped>
.icon {
	object-fit: contain;
}
</style>

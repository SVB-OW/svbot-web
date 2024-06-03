<template>
	<div class="handicaps">
		<img v-for="(handicap, i) in handicaps" :key="i" :src="`/handicaps/orange/${handicap.img}`" />
	</div>
</template>

<script setup lang="ts">
import type { Handicap } from '@/types'
defineProps({
	handicaps: {
		type: Array as PropType<Handicap[]>,
		required: true,
	},
})
</script>

<style scoped>
.handicaps {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 52px;
}

img {
	width: 40px;
	height: 40px;
	margin-right: 5px;
}
</style>

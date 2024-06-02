<template>
	<div class="handicaps">
		<link rel="preconnect" href="https://fonts.bunny.net" />
		<link href="https://fonts.bunny.net/css2?family=Rubik&display=swap" rel="stylesheet" />

		<template v-for="(handicap, i) in handicaps" :key="i">
			<img :src="`/handicaps/orange/${handicap.img}`" />
			<span>{{ handicap.text }}</span>
		</template>
	</div>
</template>

<script setup lang="ts">
import type { Handicap } from '@/types'
defineProps({
	handicaps: {
		type: Object as PropType<Handicap[]>,
		required: true,
	},
})
</script>

<style scoped>
* {
	box-sizing: border-box;
	font-family: Rubik, sans-serif;
	font-size: 26px;
	color: var(--main-color, #ff9d16);
}

.handicaps {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 16px;
}

img {
	width: 40px;
	height: 40px;
}
</style>

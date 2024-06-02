<template>
	<div class="handicaps">
		<img v-for="(handicap, i) in handicaps" :key="i" :src="`handicaps/orange/${handicap.img}`" class="handicap" />
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

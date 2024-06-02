<template>
	<div class="handicaps">
		<div v-for="(handicap, i) in handicaps" :key="i" class="handicap">
			<img :src="`handicaps/orange/${handicap.img}`" />
			<span>{{ handicap.text }}</span>
		</div>
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

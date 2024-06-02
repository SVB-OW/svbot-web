<template>
	<div class="icon"><img :src="src" /></div>
</template>

<script setup lang="ts">
defineProps({
	src: {
		type: String,
		required: true,
	},
})
</script>

<style scoped>
.icon {
	object-fit: contain;
}
</style>

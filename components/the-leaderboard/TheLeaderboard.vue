<template>
	<div :class="{ standalone: standalone }">
		<table>
			<thead>
				<tr>
					<th>Rank</th>
					<th>Contestant</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(contestant, i) in sortedContestants.slice((startLeaderboardAt - 1) * 10, startLeaderboardAt * 10)"
					:key="i"
					@click="clickRow(contestant)"
				>
					<td>{{ (startLeaderboardAt - 1) * 10 + 1 + Number(i) }}</td>
					<td>{{ contestant.name }}</td>
					<td>{{ contestant.personalBest }}</td>
				</tr>
			</tbody>
		</table>

		<br />

		<div v-if="sortedContestants.length > 10">
			<button v-for="i in ceil(sortedContestants.length / 10)" :key="i" class="page" @click="startLeaderboardAt = i">
				{{ `${(i - 1) * 10 + 1} - ${i * 10}` }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Contestant } from '@/types'
import { ref, computed } from 'vue'

const { ceil } = Math
const startLeaderboardAt = ref(1)

const props = defineProps({
	standalone: {
		type: Boolean,
		default: false,
	},
	contestants: {
		type: Array as PropType<Contestant[]>,
		default: () => [],
	},
})

const emit = defineEmits(['clickRow'])

const sortedContestants = computed(() => {
	return [...props.contestants].sort((c1, c2) => (c1.personalBest > c2.personalBest ? -1 : 1))
})

function clickRow(c: Contestant): void {
	emit('clickRow', c)
}
</script>

<style scoped>
table {
	width: 500px;
}

table,
table th,
table td {
	border: 1px solid var(--main-color);
	border-collapse: collapse;
	padding: 0.5rem 1rem;
	width: fit-content;
}

table th:nth-child(2) {
	width: 150px;
}

.standalone table {
	width: 100%;
}

.standalone button {
	display: none;
}
</style>

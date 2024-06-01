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
					v-for="(contestant, i) in [...sortedContestants()].slice(
						(startLeaderboardAt - 1) * 10,
						startLeaderboardAt * 10,
					)"
					:key="i"
					@click="continueRun(contestant)"
				>
					<td>{{ (startLeaderboardAt - 1) * 10 + 1 + Number(i) }}</td>
					<td>{{ contestant.name }}</td>
					<td>{{ contestant.personalBest }}</td>
				</tr>
			</tbody>
		</table>

		<br />

		<div v-if="sortedContestants().length > 10">
			<button v-for="i in ceil(sortedContestants().length / 10)" :key="i" class="page" @click="startLeaderboardAt = i">
				{{ `${(i - 1) * 10 + 1} - ${i * 10}` }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Contestant } from '@/types'

const { list: allContestants } = storeToRefs(useContestantsStore())
const { update: updateCurrentGame } = useCurrentGameStore()
const { ceil } = Math
const startLeaderboardAt = ref(1)

definePageMeta({
	layout: 'empty',
})

defineProps({
	standalone: {
		type: Boolean,
		default: false,
	},
})

onMounted(async () => {
	await useContestantsStore().load()
	useCurrentGameStore().load()
	useNuxtApp().$subscribeCurrentGame()
	useNuxtApp().$subscribeContestants()
})

function sortedContestants(): Contestant[] {
	return [...allContestants.value].sort((c1: Contestant, c2: Contestant) =>
		c1.personalBest > c2.personalBest ? -1 : 1,
	)
}

function continueRun(c: Contestant): void {
	updateCurrentGame({
		contestantId: c._id,
		contestantName: c.name,
	}).then(() => {
		useRouter().push('/chooseRank')
	})
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

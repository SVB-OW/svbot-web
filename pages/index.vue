<template>
	<main>
		<header>
			<h1>Leaderboard</h1>
			<img src="/gauntlet.50lr.webp" alt="Gauntlet" />
		</header>

		<input id="contestant-name" type="text" placeholder="New contestant" required autocomplete="off" />
		<input id="team-name" type="text" placeholder="Team Name" required autocomplete="off" />

		<button @click="start()">Start</button>

		<br /><br />

		<div class="split-view">
			<table>
				<tbody>
					<tr
						v-for="(contestant, i) in sortedContestants().slice((startLeaderboardAt - 1) * 10, startLeaderboardAt * 10)"
						:key="i"
						@click="continueRun(contestant)"
					>
						<td>{{ contestant.name }}</td>
						<td>{{ contestant.personalBest }}</td>
					</tr>
				</tbody>
			</table>

			<br />

			<div v-if="sortedContestants().length > 10">
				<button
					v-for="i in ceil(sortedContestants().length / 10)"
					:key="i"
					class="page"
					@click="startLeaderboardAt = i"
				>
					{{ `${(i - 1) * 10 + 1} - ${i * 10}` }}
				</button>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { Contestant } from '@/types'

const { ceil } = Math
const startLeaderboardAt = ref(1)

function sortedContestants(): Contestant[] {
	const { list: allContestants } = useContestantsStore()
	return [...allContestants].sort((c1: Contestant, c2: Contestant) => (c1.personalBest > c2.personalBest ? -1 : 1))
}

async function start(): Promise<void> {
	const { update } = useCurrentGameStore()
	const { list: allContestants, create: createContestant } = useContestantsStore()
	const contestantName = document.querySelector('#contestant-name') as HTMLInputElement
	const teamName = document.querySelector('#team-name') as HTMLInputElement
	if (contestantName.reportValidity() && teamName.reportValidity()) {
		const findContestant = allContestants.find((c: Contestant) => c.name === contestantName.value)
		if (findContestant) {
			continueRun(findContestant)
			return
		}

		const obj = new Contestant({
			name: contestantName.value,
			teamName: teamName.value,
		})

		const res = await createContestant(obj)
		obj._id = res

		contestantName.value = ''
		teamName.value = ''
		update({ contestantId: obj._id, contestantName: obj.name, teamName: obj.teamName })
		navigateTo('/chooseRank')
	}
}

function continueRun(c: Contestant): void {
	const { update } = useCurrentGameStore()
	update({ contestantId: c._id, contestantName: c.name, teamName: c.teamName })
	navigateTo('/chooseRank')
}
</script>

<style scoped>
.split-view {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

table {
	width: 500px;
}

table,
table th,
table td {
	border: none;
	border-collapse: collapse;
	padding: 0.5rem 1rem;
	width: fit-content;
}

table th:nth-child(2) {
	width: 150px;
}
</style>

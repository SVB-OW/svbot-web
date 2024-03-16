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
					v-for="(contestant, i) in [...sortedContestants].slice(
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

		<div v-if="sortedContestants.length > 10">
			<button
				v-for="i in Math.ceil(sortedContestants.length / 10)"
				:key="i"
				class="page"
				@click="startLeaderboardAt = i"
			>
				{{ `${(i - 1) * 10 + 1} - ${i * 10}` }}
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import type { Contestant } from '@/types'

export default Vue.extend({
	layout: 'empty',
	props: {
		standalone: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		Math,
		startLeaderboardAt: 1,
	}),
	computed: {
		...mapGetters({
			allContestants: 'contestants/read',
		}),
		sortedContestants(): Contestant[] {
			return [...this.allContestants].sort((c1: Contestant, c2: Contestant) =>
				c1.personalBest > c2.personalBest ? -1 : 1,
			)
		},
	},
	methods: {
		...mapActions({
			updateCurrentGame: 'currentGame/update',
		}),
		continueRun(c: Contestant): void {
			this.updateCurrentGame({
				contestantId: c._id,
				contestantName: c.name,
			}).then(() => {
				this.$router.push('/chooseRank')
			})
		},
	},
})
</script>

<style scoped>
table {
	width: 500px;
}

.standalone table {
	width: 100%;
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

.standalone button {
	display: none;
}
</style>

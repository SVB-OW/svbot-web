import type { Meta, StoryObj } from '@storybook/vue3'
import TheLeaderboard from './TheLeaderboard.vue'

const meta = {
	title: 'Components/The Leaderboard',
	component: TheLeaderboard,
} satisfies Meta<typeof TheLeaderboard>

export default meta
type Story = StoryObj<typeof TheLeaderboard>

export const Default: Story = {
	args: {
		standalone: false,
		contestants: Array(15).fill({
			_id: '1',
			name: 'test1',
			teamName: 'team1',
			personalBest: 20,
			bronzePoints: 20,
			silverPoints: 0,
			goldPoints: 0,
			platinumPoints: 0,
			diamondPoints: 0,
			masterPoints: 0,
			grandmasterPoints: 0,
		}),
	},
}

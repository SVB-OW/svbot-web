import type { Meta, StoryObj } from '@storybook/vue3'
import TheTopBar from './TheTopBar.vue'
import { Bounty, Game, Handicap, Rank } from '../../types'

const meta = {
	title: 'Components/The TopBar',
	component: TheTopBar,
} satisfies Meta<typeof TheTopBar>

export default meta
type Story = StoryObj<typeof TheTopBar>

export const Default: Story = {
	args: {
		currentGame: new Game({
			bounty: new Bounty({
				points: 2,
				img: 'emote_on_dead_body.png',
				text: 'Emote on a Dead Body',
				stack: 5,
			}),
			contestantId: '1',
			contestantName: 'Contestant1',
			handicaps: [
				new Handicap({
					points: 175,
					img: 'rank_up_enemy.png',
					text: 'RANK UP THE ENEMY',
					maxStack: 6,
				}),
			],
			rank: Rank.master,
			rank2: Rank.grandmaster,
			teamName: 'Team 1',
		}),
	},
}

import type { Meta, StoryObj } from '@storybook/vue3'
import TheHandicapsVertical from './TheHandicapsVertical.vue'
import { Handicap } from '../../types'

const meta = {
	title: 'Components/The Handicaps Vertical',
	component: TheHandicapsVertical,
} satisfies Meta<typeof TheHandicapsVertical>

export default meta
type Story = StoryObj<typeof TheHandicapsVertical>

export const Default: Story = {
	args: {
		handicaps: [
			new Handicap({
				points: 40,
				img: 'no_sound.png',
				text: 'NO IN GAME AUDIO',
				selected: true,
			}),
			new Handicap({
				points: 40,
				img: 'no_ult.png',
				text: "CAN'T USE ULTIMATE",
				selected: true,
			}),
		],
	},
}

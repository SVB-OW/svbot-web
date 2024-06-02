import type { Meta, StoryObj } from '@storybook/vue3'
import TheHandicaps from './TheHandicaps.vue'
import { Handicap } from '../../types'

const meta = {
	title: 'Components/The Handicaps',
	component: TheHandicaps,
} satisfies Meta<typeof TheHandicaps>

export default meta
type Story = StoryObj<typeof TheHandicaps>

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

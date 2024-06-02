import type { Meta, StoryObj } from '@storybook/vue3'
import GenericIcon from './GenericIcon.vue'

const meta = {
	title: 'Components/Generic Icon',
	component: GenericIcon,
} satisfies Meta<typeof GenericIcon>

export default meta
type Story = StoryObj<typeof GenericIcon>

export const Default: Story = {
	args: {
		src: '/ranks/orange/grandmaster.png',
	},
}

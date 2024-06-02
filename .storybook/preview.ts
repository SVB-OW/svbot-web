import type { Preview } from '@storybook/vue3'

const preview: Preview = {
	tags: ['autodocs'],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			autodocs: true,
		},
		layout: 'fullscreen',
	},
}

export default preview

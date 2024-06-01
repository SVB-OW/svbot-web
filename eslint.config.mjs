// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	// your custom flat configs go here, for example:
	{
		files: ['**/*.ts', '**/*.vue'],
		rules: {
			'@typescript-eslint/consistent-type-imports': 'warn',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			eqeqeq: 'warn',
			'no-console': 'off',
			'no-prototype-builtins': 'off',
			'vue/html-self-closing': 'off',
		},
	},
)

// eslint.config.js
export default [
	{
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
			project: './tsconfig.json',
		},
		plugins: ['react'],
		extends: [
			'next/core-web-vitals',
			'next',
			'prettier',
			'eslint:recommended',
			'eslint-config-next',
		],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/no-unescaped-entities': 'off',
			'@next/next/no-page-custom-font': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		overrides: [
			{
				files: ['*.ts', '*.tsx'],
				rules: {
					'no-undef': 'off',
				},
			},
		],
	},
];
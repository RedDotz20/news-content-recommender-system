import react from 'eslint-plugin-react';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends(
		'plugin:@tanstack/query/recommended',
		'next/core-web-vitals',
		'next',
		'prettier',
		'eslint:recommended',
		'eslint-config-next'
	),
	{
		plugins: {
			react,
			tanstackQuery,
		},

		languageOptions: {
			ecmaVersion: 5,
			sourceType: 'script',

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},

				project: './tsconfig.json',
			},
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/no-unescaped-entities': 'off',
			'@next/next/no-page-custom-font': 'off',
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],

		rules: {
			'no-undef': 'off',
			'no-unused-vars': 'warn',
		},
	},
];

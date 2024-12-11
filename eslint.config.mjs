import react from 'eslint-plugin-react';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const config = [
  ...compat.extends(
    'next',
    'prettier',
    'plugin:@tanstack/query/recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'eslint:recommended',
    'eslint-config-next'
    // 'plugin:@typescript-eslint/recommended',
    // 'next/typescript',
  ),
  {
    ignores: ['node_modules', '**/dev/*', '**/dist/*', '**/tests/*', 'tsconfig.json'],
    plugins: {
      react,
      tanstackQuery
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        ecmaFeatures: {
          2021: true,
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'warn'
    }
  }
];

export default config;

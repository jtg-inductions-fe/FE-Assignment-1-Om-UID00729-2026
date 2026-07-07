import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
    js.configs.recommended,
    eslintPluginPrettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            camelcase: ['warn'],
            'no-console': ['warn'],
        },
    },
];

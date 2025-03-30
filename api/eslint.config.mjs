import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['src/**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  prettierConfig, // Add Prettier config to disable conflicting rules
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'no-undef': 0,
      'prettier/prettier': 'warn'
    }
  }
];

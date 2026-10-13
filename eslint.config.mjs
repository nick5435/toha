import neostandard from 'neostandard'
import eslintConfigPrettier from 'eslint-config-prettier'
import noJquery from 'eslint-plugin-no-jquery'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules/**',
      'exampleSite/**',
      'public/**',
      'resources/**',
      '.agents/**',
      'packages/**',
      'static/**',
    ],
  },
  ...neostandard({
    noStyle: true,
    noJsx: true,
  }),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
    plugins: {
      'no-jquery': noJquery,
    },
    rules: {
      ...noJquery.configs.all.rules,
    },
  },
  eslintConfigPrettier,
]

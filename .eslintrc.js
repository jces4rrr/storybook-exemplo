module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    it: 'readonly',
    beforeEach: 'readonly',
    jest: 'readonly',
    expect: 'readonly',
    describe: 'readonly',
  },

  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  overrides: [
    {
      files: [
        '**/**/*.spec.{j,t}s?(x)',
        './tests/unit/**/*.spec.{j,t}s?(x)',
        './src/**/*.spec.{j,t}s?(x)',
        './tests/*.setup.js',
        './tests/utils.js',
      ],
      env: {
        jest: true,
      },
    },
  ],

  rules: {
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/valid-attribute-name': 'off',

    // allow async-await
    'generator-star-spacing': 'off',
    'no-global-assign': 'error',
    'no-var': 'error',
    semi: 'off',

    // allow debugger during development
    'no-debugger':
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
        ? 'error'
        : 'off',

    'no-console':
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
        ? 'error'
        : 'off',
  },
}

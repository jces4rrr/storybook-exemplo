/** @type {import('jest').Config} */
const config = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['core-js', './tests/main.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/env.setup.js'],
  workerIdleMemoryLimit: '1024MB',

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/.storybook/',
    '<rootDir>/dist/',
    '<rootDir>/src/assets/',
    '<rootDir>/src/helpers/',
    '<rootDir>/src/locales/',
    '<rootDir>/src/plugins/',
    '<rootDir>/src/stories/',
    '<rootDir>/src/styles/',
    '<rootDir>/tests/env.setup.js',
    '<rootDir>/tests/main.setup.js',
    '<rootDir>/tests/utils.js',
    '.stories.js$',
    'main.js',
    'componentsBaseOptions.js',
    'componentsBaseProps.js',
    'componentsBaseMixin.js',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', 'lcov', 'json', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['src/**/**/*.{js,vue}', '!**/node_modules/**'],

  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.js',
    '<rootDir>/src/**/*.spec.js',
  ],
  transformIgnorePatterns: ['/node_modules/(?!vuetify)'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': '@vue/vue2-jest',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = config

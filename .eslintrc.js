'use strict';

const fs = require('fs');

// set alias
const {plugins} = JSON.parse(fs.readFileSync('./.babelrc'));
const alias = plugins.slice(-1)[0][1].alias;

module.exports = {
  globals: {
    Promise: true
  },
  extends: [
    'eslint:recommended',
    'google',
    'cat'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      objectLiteralDuplicateProperties: true
    }
  },
  env: {
    jest: true,
    browser: true,
    node: true
  },
  plugins: [
    'import'
  ],
  settings: {
    'import/resolver': {
      'babel-module': alias
    }
  }
};


module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 0,
    // 结尾不使用分号
    semi: ['error', 'never'],
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'operator-linebreak': 0,
    'object-curly-newline': 0,
    'linebreak-style': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'arrow-parens': 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}

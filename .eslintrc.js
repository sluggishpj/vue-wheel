module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    },
    'eslint.validate': [
      {
        language: 'vue',
        autoFix: true
      },
      {
        language: 'html',
        autoFix: true
      }
    ]
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    // 结尾不使用分号
    semi: ['error', 'never'],
    'import/prefer-default-export': 0,
    'template-curly-spacing': 0,
    indent: 0,
    'no-param-reassign': 0,
    'no-plusplus': 0
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}

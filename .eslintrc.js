module.exports = {
   'env': {
      'browser': true,
      'es2021': true,
      'node': true
   },
   'extends': 'eslint:recommended',
   'parser': '@babel/eslint-parser',
   'parserOptions': {
      'requireConfigFile': false
   },
   'ignorePatterns': ['dist/main.js'],
   'rules': {
      'prefer-const': 'error',
      'no-multiple-empty-lines': 'warn',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 3],
      'brace-style': ['error', '1tbs'],
      'object-curly-spacing': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'key-spacing': ['error', {'beforeColon': false}],
      'keyword-spacing': ['error', {'after': true}],
      'space-before-blocks': ['error', 'always'],
      'comma-spacing': ['error', {'before': false, 'after': true}],
      'eol-last': ['error', 'always'],
   }
}

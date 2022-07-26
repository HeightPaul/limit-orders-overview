module.exports = {
   'env': {
      'browser': true,
      'es2021': true,
      'node': true
   },
   'extends': 'eslint:recommended',
   'parser': '@babel/eslint-parser',
   'parserOptions': {
      'requireConfigFile': false,
      'babelOptions': {
         'plugins': [
            '@babel/plugin-syntax-import-assertions'
         ]
      },
   },
   'rules': {
      'prefer-const': 'error',
      'no-multiple-empty-lines': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 3],
      'brace-style': ['error', '1tbs'],
      'object-curly-spacing': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'key-spacing': ['error', {'beforeColon': false}],
      'space-before-blocks': ['error', 'always'],
      'comma-spacing': ['error', {'before': false, 'after': true}],
      'eol-last': ['error', 'always'],
   }
};

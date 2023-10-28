module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'plugin:react/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'semi': [2, 'never'],
    'require-jsdoc': ['off', {}],
    'react/react-in-jsx-scope': [0, {}],
    'max-len': [0],
    'indent': [0],
    'linebreak-style': ['off', {}],
    'keyword-spacing': ['off', {}],
    'eol-last': ['off', {}],
    'object-curly-spacing': ['off', {}],
    'react/prop-types': ['off', {}],
    'arrow-parens': ['off', {}],
    'no-unused-vars': ['off', {}],
  },
}

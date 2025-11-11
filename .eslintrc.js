module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'max-len': ['warn', { code: 120 }],
    'no-console': 0,
    'no-debugger': 1,
    'no-var': 2,
    'semi': [2, 'always'],
    'no-unused-vars': [
      1,
      {
        args: 'none',
        argsIgnorePattern: '^_',
        vars: 'local',
        varsIgnorePattern: '^_',
      },
    ],
    'key-spacing': [
      'error',
      {
        mode: 'minimum',
        beforeColon: false,
        afterColon: true,
      },
    ],
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'no-trailing-spaces': 0,
    'eol-last': 2,
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0 }],
    indent: [0, 2, { SwitchCase: 1 }],
    'no-underscore-dangle': 'off',
    'no-alert': 'off',
    'no-lone-blocks': 0,
    'jsx-quotes': 1,
    'react/prop-types': [0, { ignore: ['classes', 'children', 'props.children'] }],
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'never', allow: [] }],
    'no-shadow-restricted-names': 'error',
    'no-prototype-builtins': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@src', './src']],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};

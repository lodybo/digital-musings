module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['ghost', 'react', 'jsx-a11y', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:ghost/node',
    'plugin:ghost/ember',
    'plugin:react/recommended',
    'prettier',
  ],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.0',
      flowVersion: '0.53',
    },
    propWrapperFunctions: ['forbidExtraProps'],
  },
  rules: {
    indent: ['error', 2],
    camelcase: [
      'error',
      {
        allow: [
          '^codeinjection',
          'short_name',
          'start_url',
          'background_color',
          'theme_color',
          'feature_image',
          'primary_author',
          'profile_image',
          'cover_image',
        ],
      },
    ],
    'ghost/sort-imports-es6-autofix/sort-imports-es6': 'off',
    'ghost/ember/use-ember-get-and-set': 'off',
    'no-console': 'off',
    'no-inner-declarations': 'off',
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    'consistent-return': ['error'],
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-undef': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'react/prop-types': [
      'error',
      {
        ignore: ['children'],
      },
    ],
  },
};

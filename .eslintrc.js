module.exports = {
   parser: '@typescript-eslint/parser',
   extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
   ],
   plugins: ['prettier'],
   env: {
      es2021: true,
      node: true,
   },
   ignorePatterns: ['node_modules', 'lib'],
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
         impliedStrict: true,
      },
   },
   rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      'prettier/prettier': [
         'error',
         {
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            endOfLine: 'auto',
         },
      ],
   },
};

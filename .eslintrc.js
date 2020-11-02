module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "prettier/vue",
        "plugin:prettier/recommended",
    ],

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },

    parserOptions: {
        parser: 'babel-eslint',
    },

    plugins: ['prettier'],

    'extends': [
      'plugin:vue/essential',
      'eslint:recommended',
      'prettier/vue',
      'plugin:prettier/recommended'
    ]
}

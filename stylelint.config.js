/** @type {import('stylelint').Config} */
const stylelintConfig = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9_-]+$',
    'color-named': 'never',
    'unit-allowed-list': ['px', 'rem', '%', 'em', 's', 'ms', 'vh', 'vw'],
    'max-nesting-depth': 3,
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9_-]+$',
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'at-rule-no-unknown': null,
    'order/properties-alphabetical-order': null,
  },
  ignoreFiles: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.css', '.next/**/*', 'node_modules/**/*'],
};

export default stylelintConfig;

/** @type {import('stylelint').Config} */
const stylelintConfig = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9_-]+$',
    'color-named': 'never',
    'color-function-notation': 'modern',
    'alpha-value-notation': 'percentage',
    'unit-allowed-list': ['px', 'rem', '%', 'em', 's', 'ms', 'vh', 'vw', 'fr', 'deg'],
    'max-nesting-depth': 5,
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9_-]+$',
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'media-feature-range-notation': 'context',
    'media-query-no-invalid': null,
    'declaration-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'rule-empty-line-before': null,
    'no-descending-specificity': null,
    'declaration-property-value-no-unknown': null,
    'keyframes-name-pattern': null,
    'at-rule-no-unknown': null,
  },
  ignoreFiles: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.css', '.next/**/*', 'node_modules/**/*'],
};

export default stylelintConfig;

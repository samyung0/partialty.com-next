/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 120,
  useTabs: false,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  jsxSingleQuote: false,
  bracketSameLine: false,
  endOfLine: 'lf',
};

export default config;

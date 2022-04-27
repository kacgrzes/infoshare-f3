/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  presets: [require('../../tailwind-presets.js')(__dirname)],
  content: ['src/**/*.tsx'],
  plugins: [require('tailwind-rn/unsupported-core-plugins')],
};

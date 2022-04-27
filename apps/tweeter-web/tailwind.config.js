const { join } = require('path');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  presets: [require('../../tailwind-presets.js')(__dirname)],
  content: [join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}')],
};

const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  theme: {
    extend: {
      colors: {
        blue: '#1DA1F2',
        black: '#14171A',
        'dark-gray': '#657786',
        gray: '#AAB8C2',
        'light-gray': '#E1E8ED',
        white: '#F5F8FA',
        red: '#FF0000',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
};

module.exports = (dirPath) => {
  return {
    ...config,
    content: [...createGlobPatternsForDependencies(dirPath)],
  };
};

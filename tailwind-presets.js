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
        'almost-white': '#F5F8FA',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      width: {
        '150': '600px'
      }
    },
  },
};

module.exports = config;

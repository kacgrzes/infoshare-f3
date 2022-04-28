const { merge } = require('webpack-merge');

console.log('ejejeje');

module.exports = (config, context) => {
  return merge(config, {
    // overwrite values here
    resolve: {
      alias: {
        'react-native$': 'react-native-web',
      },
      extensions: ['.web.js', '.web.ts', '.web.tsx'],
    },
  });
};

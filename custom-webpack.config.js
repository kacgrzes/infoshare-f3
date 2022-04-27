const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    // overwrite values here
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
    },
  });
};

module.exports = {
    resolve: {
      fallback: {
        buffer: false,
        crypto: require.resolve('crypto-browserify'),
      },
    },
  };
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const VENDORS_DIR = path.resolve(__dirname, 'node_modules');
const target = process.env.npm_lifecycle_event;
const isDevServer = target && target.startsWith('dev');

module.exports = function override(config, argv) {
  const dev = isDevServer || !argv || argv.mode !== 'production';
  const babelOptions = {
    plugins: [],
    compact: !dev,
  };

  config.resolve = {
    ...config.resolve,
    alias: { '@src': SRC_DIR },
  };

  config.module = {
    ...config.module,
    rules: [
      ...config.module.rules,
      // eslint-loader removed - react-scripts 5 uses eslint-webpack-plugin instead
      {
        test: /\.(js|jsx|mjs)$/,
        include: SRC_DIR,
        exclude: VENDORS_DIR,
        use: [
          // parallelize js load
          {
            loader: 'thread-loader',
            options: {
              poolTimeout: isDevServer ? Infinity : 100,
            },
          },
          {
            loader: 'babel-loader?optional=runtime&cacheDirectory',
            options: babelOptions,
          },
        ],
      },
    ],
  };

  return config;
};

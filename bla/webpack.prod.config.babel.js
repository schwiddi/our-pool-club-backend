import { DefinePlugin, optimize } from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.config.babel';

export default merge(common, {
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new optimize.UglifyJsPlugin({
      sourceMap: true,
      exclude: /viz\.js/,
      parallel: {
        cache: true,
        workers: 2,
      },
      uglifyOptions: {
        compress: {
          warnings: true,
        },
      },
    }),
  ],
});

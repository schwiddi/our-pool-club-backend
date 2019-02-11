import { DefinePlugin } from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.config.babel';

export default merge(common, {
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: 'src/',
    inline: true,
    hot: false,
    proxy:
    {
      '/api': {
        target: 'http://localhost:3001',
        ws: true,
        logLevel: 'debug',
      },
    },
  },
});

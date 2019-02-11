import merge from 'webpack-merge';
import dev from './webpack.dev.config.babel';

export default merge(dev, {
  devServer: {
    host: '0.0.0.0',
    port: 3002,
    disableHostCheck: true,
  },
});

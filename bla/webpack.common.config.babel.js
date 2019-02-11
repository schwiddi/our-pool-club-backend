import path from 'path';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import GitRevisionPlugin from 'git-revision-webpack-plugin';

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const git = new GitRevisionPlugin({
  versionCommand: 'describe --always --tags --dirty',
});

let ctx = process.env.CONTEXT ? process.env.CONTEXT : '/';
if (ctx.length > 1 && !ctx.endsWith('/')) {
  ctx = `${ctx}/`;
}

export default {
  entry: ['babel-polyfill', path.join(srcPath, 'index.jsx')],
  output: {
    path: distPath,
    publicPath: ctx,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      srcPath,
      path.resolve('./node_modules'),
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(git.version()),
        CONTEXT: JSON.stringify(ctx),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'mule',
      template: path.join(srcPath, 'index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(srcPath, 'assets', 'logo.png'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
  module: {
    noParse: /viz/,
    rules: [
      {
        test: /\.jsx?/,
        include: srcPath,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};

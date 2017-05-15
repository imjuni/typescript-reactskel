import * as path from 'path';
import * as webpack from 'webpack';

/* tslint:disable variable-name */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/* tslint:disable variable-name */

const extractStyle = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  disable: false,
  ignoreOrder: true,
});

const rootPath = path.resolve(__dirname, '../..');
const deployPath = path.resolve(path.join(rootPath, 'dist', 'client'));
const clientPackage = require('../../package.json');

const config = {
  devtool: 'source-map',

  entry: path.resolve(rootPath, 'src/client/client.tsx'),

  output: {
    path: path.resolve(__dirname, `./${deployPath}/client`),
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].bundle.js.map',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [
      'web_modules',
      'node_modules',
      './src/client/services',
      './src/client/resources',
      './src/client/redux',
      './src/client/config',
      './src/client/components',
    ],
  },

  module: {
    rules: [
      { // 0
        test: /\.tsx?$/,
        enforce: 'pre',
        exclude: [
          /node_modules/,
          './src/server/**',
          /webpack.config.*.ts/,
        ],
        loader: 'tslint-loader',
      },
      { // 1
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/,
          './src/server/**',
        ],
        query: {
          configFileName: path.resolve(rootPath, 'config/tsconfig/client.dev.json'),
        },
      },
      { // 2
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?.+)?$/,
        loader: 'file-loader',
      },
      { // 3
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
      },
      { // 4
        test: /\.json$/,
        loader: 'json',
      },
      { // 5
        test: /\.css$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      { // 6
        test: /\.scss$/,
        use: extractStyle.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: clientPackage.version,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'tsskel',
      minChunks: Infinity,
      filename: 'tsskel.bundle.js',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath, 'src/client/index.html'),
    }),
    extractStyle,
  ],

  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  devServer: {
    contentBase: `./${deployPath}`,
    historyApiFallback: true,
    port: process.env.PORT || 32289,
    inline: true,
    hot: true,
  },
};

module.exports = config;

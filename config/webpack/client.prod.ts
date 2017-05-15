import * as path from 'path';
import * as webpack from 'webpack';

/* tslint:disable variable-name */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/* tslint:disable variable-name */

const devConfig = require('./webpack.config');

const extractStyle = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  disable: false,
  ignoreOrder: true,
});

const config = Object.assign({}, devConfig, {
  devtool: false,

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
          'webpack.config.client.dev.ts',
          './src/server/**',
        ],
        query: {
          configFileName: 'tsconfig.client.json',
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
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/client/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ExtractTextPlugin('[name].[hash].css', { disable: false }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
});

module.exports = config;

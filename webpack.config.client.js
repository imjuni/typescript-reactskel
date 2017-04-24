/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * ExtractTextPlugin을 사용할 때 오류가 발생한다.
 */

const extractStyle = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  disable: false,
  ignoreOrder: true,
});

const deployPath = 'dist';

const config = {
  devtool: 'source-map',

  entry: path.resolve(__dirname, './src/client/client.tsx'),

  output: {
    path: path.resolve(__dirname, `./${deployPath}/client`),
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].bundle.js.map',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
        exclude: [/node_modules/, './src/server/**'],
        loader: 'tslint-loader',
      },
      { // 1
        test: /\.tsx?$/,
        loader: 'ts-loader',
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      { // 6
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'tsskel',
      minChunks: Infinity,
      filename: 'tsskel.bundle.js',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/client/index.html'),
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

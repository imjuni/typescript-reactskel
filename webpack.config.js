/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackConfigUtil = require('./webpack.config.util');

const deployPath = 'public';

const loaderConfig = {
  babel: {
    query: {
      presets: ['react', 'latest', 'stage-0'],
      plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
    },
  },
};

const config = {
  devtool: 'eval-source-map',

  entry: path.resolve(__dirname, './src/client/Container.tsx'),
  output: {
    path: path.resolve(__dirname, `./${deployPath}`),
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].bundle.js.map',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    modulesDirectories: [
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
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
        excludes: [ /node_modules/, './src/server/**' ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [WebpackConfigUtil.loaderConfigToString('babel', loaderConfig), 'eslint-loader'],
        babelrc: false,
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?.+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss', { publicPath: '' }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap', { publicPath: '' }),
      },
    ],
  },

  postcss: [
    autoprefixer,
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/client/index.html'),
    }),
    new ExtractTextPlugin('[name].[hash].css', { disable: false }),
    new CopyWebpackPlugin([{ from: `${__dirname}/src/client` }]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  eslint: {
    configFile: './.eslintrc.js',
  },

  devServer: {
    contentBase: `./${deployPath}`,
    colors: true,
    historyApiFallback: true,
    port: process.env.PORT || 32289,
    inline: true,
    hot: true,
  },
};

module.exports = config;

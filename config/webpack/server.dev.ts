import * as path from 'path';
import * as webpack from 'webpack';

const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');

/* tslint:disable variable-name */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/* tslint:enable variable-name */

const deployPath = 'dist';

const loaderConfig = {
  babel: {
    query: {
      presets: ['react', 'latest', 'stage-0'],
      plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
    },
  },
};

const config = [
  // Server Webpack Configuration
  {
    entry: path.resolve(__dirname, './src/server/server.ts'),
    output: {
      path: path.resolve(__dirname, `./${deployPath}/server`),
      filename: 'server.js',
      sourceMapFilename: 'server.js.map',
      publicPath: '/',
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    externals: [nodeExternals()],
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: 'tslint',
          excludes: [/node_modules/, './src/client/**'],
        },
        {
          test: /\.ts(x?)$/,
          loader: 'ts-loader?configFileName=tsconfig.server.json',
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: [WebpackConfigUtil.loaderConfigToString('babel', loaderConfig), 'eslint-loader'],
          babelrc: false,
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
      ],
    },
  },
  // Client Webpack Configuration
  {
    entry: path.resolve(__dirname, './src/client/client.tsx'),
    output: {
      path: path.resolve(__dirname, `./${deployPath}/client`),
      filename: 'client.js',
      sourceMapFilename: 'client.js.map',
      publicPath: '/',
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    externals: nodeExternals(),
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
          test: /\.ts(x?)$/,
          loader: 'ts-loader?configFileName=tsconfig.client.json',
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
      // new HtmlWebpackPlugin({
      //   template: path.resolve(__dirname, './src/client/index.html'),
      // }),
      new ExtractTextPlugin('[name].[hash].css', { disable: false }),
      // new CopyWebpackPlugin([{ from: `${__dirname}/src/client` }]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],

    externals: {
      jsdom: 'window',
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    }
  }
];

module.exports = config;

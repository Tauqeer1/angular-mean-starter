const autoprefixer = require('autoprefixer');
const clone = require('js.clone');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;

import { root, includeClientPackages } from './helpers';

// Common
export const commonPlugins = [
  new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    root('./src'),
    {}
  ),

  new LoaderOptionsPlugin({
    debug: false,
    options: {
      postcss: [
        autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
      ],
      resolve: {}
    }
  })
];

export const commonConfig = {
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ root('node_modules') ]
  },

  context: root('./'),

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e|d)\.ts$/],
        use: ['ts-loader', 'angular2-template-loader']
      },
      {
        test: /\.pug/,
        use: ['raw-loader', 'pug-html-loader']
      },
      {
        test: /\.styl$/,
        use: [
          'exports-loader?module.exports.toString()',
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', options: { sourceMap: true } },
          { loader: 'stylus-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]?[hash]'
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ],
  }
};

// Client
export const clientPlugins = [
  new CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/[name].[hash].js',
    minChunks: Infinity
  }),

  new HtmlWebpackPlugin({
    chunksSortMode: 'auto',
    filename: '../index.html',
    hash: true,
    inject: 'body',
    template: './src/index.pug'
  })
];

export const clientConfig = {
  target: 'web',

  entry: {
    main: './src/main',
    vendor: './src/vendor'
  },

  output: {
    filename: 'js/[name].[hash].js',
    path: root('./target/assets'),
    publicPath: '/assets/'
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


// Server.
export const serverPlugins = [];

export const serverConfig = {
  target: 'node',

  entry: './src/server',

  output: {
    filename: '../server.js',
    path: root('./target/assets'),
    publicPath: '/assets/',
    libraryTarget: 'commonjs2'
  },

 externals: includeClientPackages(
   /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
 ),

  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};
/**
 * Created by niefz on 2018/9/18.
 */
const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.js');

const APP_PATH = resolve(__dirname, 'src');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  output: {
    path: APP_PATH,
  },
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  devServer: {
    proxy: {},
    contentBase: APP_PATH,
    compress: true,
    historyApiFallback: true,
    allowedHosts: [
      '.midea.com',
    ],
    hot: true,
    open: true,
    port: 12586,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    {{#stylelint}}
    new StyleLintPlugin({
      context: 'src/',
      files: ['**/*.{vue,html,s?(a|c)ss}'],
      cache: true
    }),
    {{/stylelint}}
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: '',
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      },
    ),
  ],
});
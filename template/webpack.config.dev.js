/**
 * Created by niefz on 2018/9/18.
 */
const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const webpackBaseConfig = require('./webpack.config.base.js');

const APP_PATH = resolve(__dirname, 'src');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  output: {
    path: APP_PATH
  },
  devtool: 'cheap-module-eval-source-map',
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
      errors: true
    }
  },
  watchOptions: {
    ignored: /node_modules/
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
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
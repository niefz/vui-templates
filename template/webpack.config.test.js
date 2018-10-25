/**
 * Created by niefz on 2018/9/18.
 */
const webpackMerge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.config.base.js');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: '#inline-source-map',
});
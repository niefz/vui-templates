/**
 * Created by niefz on 2018/9/18.
 */
const webpackMerge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.base.js');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: '#inline-source-map',
});

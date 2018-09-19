/**
 * Created by niefz on 2018/8/27.
 */
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = {};
const entryJs = glob.sync('src/public/**/index.js');

entryJs.forEach((filePath) => {
  const filename = filePath.replace(/(src\/public\/)|(\/index.js)/g, '');
  entries[filename] = filePath;
});

const htmlPlugins = [];
const entryHtml = glob.sync('src/public/**/index.html');

entryHtml.forEach((filePath) => {
  const filename = filePath.replace(/(src\/public\/)|(\/index.html)/g, '');
  const htmlPluginConfig = {
    filename: `public/${filename}/index.html`,
    template: filePath,
    inject: 'body',
    favicon: 'src/favicon.ico',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true
    },
    chunks: ['vendors', 'commons', filename],
    chunksSortMode: 'dependency'
  };
  htmlPlugins.push(new HtmlWebpackPlugin(htmlPluginConfig));
});

module.exports = {
  entry: entries,
  plugins: [
    ...htmlPlugins
  ]
};
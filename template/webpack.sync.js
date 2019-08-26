/**
 * Created by niefz on 2018/9/18.
 */
const webpackMerge = require('webpack-merge');
const portfinder = require('portfinder');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const serverConfig = require('./webpack.server.js');

module.exports = portfinder
  .getPortPromise({
    port: 8080,
  })
  .then(port => webpackMerge(serverConfig, {
    devServer: {
      port,
    },
    plugins: [
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          // proxy the Webpack Dev Server endpoint
          // (which should be serving on http://localhost:3100/)
          // through BrowserSync
          proxy: {
            target: `http://localhost:${port}`,
          },
        },
        // plugin options
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this
          reload: false,
        },
      ),
    ],
  }));

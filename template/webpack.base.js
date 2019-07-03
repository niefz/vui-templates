/**
 * Created by niefz on 2018/9/18.
 */
const { resolve } = require('path');
const glob = require('glob');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const APP_PATH = resolve(__dirname, 'src');

// 多入口
const entries = {};
const htmlPlugins = [];

glob.sync(`${APP_PATH}/pages/**/index.js`)
  .forEach((filePath) => {
    const filename = filePath.match(/\/pages\/(.+)\/index.js/)[1];
    entries[filename] = filePath;
    const htmlPluginConfig = {
      filename: `${filename}/index.html`,
      template: `${APP_PATH}/pages/${filename}/index.html`,
      inject: 'body',
      favicon: `${APP_PATH}/favicon.ico`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      },
      chunks: ['vendors', 'commons', filename],
      chunksSortMode: 'dependency',
    };
    htmlPlugins.push(new HtmlWebpackPlugin(htmlPluginConfig));
  });

module.exports = {
  entry: {
    vendors: [
      'axios',
      'babel-polyfill',
      'vue',
      {{#i18n}}
      'vue-i18n',
      {{/i18n}}
      {{#router}}
      'vue-router',
      {{/router}}
      {{#vuex}}
      'vuex',
      {{/vuex}}
    ],
    index: `${APP_PATH}/index.js`,
    ...entries,
  },
  output: {
    publicPath: '/',
    filename: 'assets/js/[name].min.js?v=[hash:8]',
    crossOriginLoading: 'anonymous',
    chunkFilename: 'assets/js/[name].min.js?v=[chunkhash:8]',
  },
  module: {
    noParse: /node_modules\/(moment|echarts|highcharts\.js)/,
    rules: [
      {
        test: /\.x?html?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {{#htmllint}}
          {
            loader: 'htmllint-loader',
            query: {
              config: '.htmllintrc',
              failOnError: true,
              failOnWarning: false,
            },
          },
          {{/htmllint}}
          {
            loader: 'html-loader',
          },
        ],
      },
      {{#eslint}}
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=eslint',
          },
        ],
      },
      {{/eslint}}
      {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=babel',
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'happypack/loader?id=sass',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]?v=[hash:8]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/media/[name].[ext]?v=[hash:8]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]?v=[hash:8]',
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.scss', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@': APP_PATH,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: Infinity,
        },
      },
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    {{#eslint}}
    new HappyPack({
      id: 'eslint',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'eslint-loader',
          options: {
            cache: true,
            formatter: require('eslint-friendly-formatter'),
          },
        },
      ],
    }),
    {{/eslint}}
    new HappyPack({
      id: 'babel',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
            cacheDirectory: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'sass',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
      favicon: 'src/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      },
      chunks: ['vendors', 'commons', 'index'],
      chunksSortMode: 'dependency',
    }),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].min.css?v=[hash:8]',
      chunkFilename: 'assets/js/[name].min.css?v=[chunkhash:8]',
    }),
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

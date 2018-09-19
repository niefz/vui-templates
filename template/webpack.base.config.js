/**
 * Created by niefz on 2018/9/18.
 */
const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// 多入口
const multipageConfig = require('./multipage.config.js');

const APP_PATH = resolve(__dirname, 'src');

module.exports = webpackMerge({
  entry: {
    vendors: ['axios', 'babel-polyfill', 'vue', 'vue-i18n', 'vue-router', 'vuex'],
    index: 'src/index.js'
  },
  output: {
    publicPath: '/',
    filename: 'assets/js/[name].min.js?v=[hash:8]',
    chunkFilename: 'assets/js/[name].min.js?v=[chunkhash:8]'
  },
  module: {
    rules: [
      {{#htmllint}}
      {
        test: /\.x?html?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'htmllint-loader',
            query: {
              config: '.htmllintrc',
              failOnError: true,
              failOnWarning: false
            },
          }
        ]
      },
      {{/htmllint}}
      {{#eslint}}
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=eslint'
          }
        ]
      },
      {{/eslint}}
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=babel'
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'happypack/loader?id=sass'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'happypack/loader?id=less'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]?v=[hash:8]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/media/[name].[ext]?v=[hash:8]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]?v=[hash:8]'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.js',
      'src': APP_PATH
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: Infinity
        }
      }
    }
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
            formatter: require('eslint-friendly-formatter')
          }
        }
      ]
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
            cacheDirectory: true
          }
        }
      ]
    }),
    new HappyPack({
      id: 'sass',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader'
        }
      ]
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader'
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
        sortClassName: true
      },
      chunks: ['vendors', 'commons', 'index'],
      chunksSortMode: 'dependency'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].min.css?v=[hash:8]'
    })
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}, multipageConfig);
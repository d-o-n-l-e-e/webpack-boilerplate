const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = (env, argv) => {
  console.log('ENV:', argv.mode, '\n')
  return merge(common, {
    mode: 'production',
    plugins: [
      // new ExtractTextPlugin({filename: 'style.css', disable: false, allChunks: true}),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        inlineSource: '.(js|css)$',
      }),
      new HtmlWebpackInlineSourcePlugin(),
    ],
    module: {
      rules: [{
        test: /\.scss$/,
        // use: ExtractTextPlugin.extract({ // separate css files
        //   fallback: 'style-loader',
        //   use: [{
        //     loader: 'css-loader',
        //     options: {
        //       minimize: true,
        //       sourceMap: true,
        //     },
        //   },{
        //     loader: 'postcss-loader',
        //     options: {
        //       sourceMap: true,
        //       plugins: (loader) => [
        //         require('autoprefixer')(),
        //       ],
        //     }
        //   },{
        //     loader: 'sass-loader',
        //     options: {
        //       sourceMap: true,
        //       data: "$env: " + argv.mode + ";", // $env == production
        //     },
        //   }],
        // })
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true,
            singleton: true,
          }
        },{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            minimize: true,
          },
        },{
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: (loader) => [
              require('autoprefixer')(),
            ],
          },
        },{
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            data: "$env: " + argv.mode + ";", // $env == development
          },
        }],
      }]
    },
  })
}
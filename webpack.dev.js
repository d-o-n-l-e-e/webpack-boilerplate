const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const apiServer = require('./server')

module.exports = (env, argv) => {
  console.log('ENV:', argv.mode, '\n');
  console.log('Mongoose API running on PORT 3001', '\n');

  apiServer();

  return merge(common, {
    mode: 'development',
    devServer: {
      hot: true,
      watchContentBase: true, // initiate a page refresh if static content changes
      proxy: [ // allows redirect of requests to webpack-dev-server to another destination
        {
          context: ['/api'],  // can have multiple
          target: 'http://localhost:3001', // server and port to redirect to
          secure: false,
        },
      ],
      port: 3000, // port webpack-dev-server listens to, defaults to 8080
      overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
        warnings: false, // defaults to false
        errors: false, // defaults to false
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        hash: true,
      }),
    ],
    module: {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true,
            // singleton: true
          }
        },{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            minimize: false,
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
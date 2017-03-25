var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: [APP_DIR + '/components/main.js',APP_DIR + '/scss/main.scss'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    rules: [{
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
            presets: ['es2015', 'react']
        }
      },{
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader",
            options: {
                    sourceMap: true
            } // translates CSS into CommonJS
        }, {
            loader: "sass-loader",
            options: {
              sourceMap: true
            } // compiles Sass to CSS
        }]
    }]
  },
  plugins: [new HtmlWebpackPlugin({template: './index.html'})]
};

module.exports = config;
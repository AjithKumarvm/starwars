var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "styles.min.css",
    disable: false
});

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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: "css-loader!sass-loader",
        })
      }]
  },
    plugins: [
      new ExtractTextPlugin({
        filename: 'bundle.min.css',
        allChunks: true,
        disable:false
      })
    ]
};

module.exports = config;
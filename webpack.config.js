'use srtict';

var webpack = require('webpack');

module.exports = {
  entry: './js/main',
  output: {
    filename: './js/bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src']
  }
};

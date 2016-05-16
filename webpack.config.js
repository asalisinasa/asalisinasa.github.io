'use srtict';

var webpack = require('webpack');

module.exports = {
  entry: './js/main',
  output: {
    filename: './js/script.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src']
  }
};

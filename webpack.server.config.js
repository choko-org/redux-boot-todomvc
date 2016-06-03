var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {

  debug: false,

  entry: {
    index: './server.js',
  },

  node: {
    __dirname: true,
    __filename: true,
  },

  target: 'node',

  devtool: 'source-map',

  output: {
    path: './build',
    filename: 'server.js',
    library: 'server',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
    ]
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname)
      ],
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  externals: nodeModules,
}

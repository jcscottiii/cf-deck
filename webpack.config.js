var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var postcss_local_scope = require('postcss-local-scope');

var srcDir = './static_src';

module.exports = {
  entry: srcDir + '/main.js',

  output: {
    path: path.resolve('./static'),
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel?optional[]=runtime',
        exclude: /node_modules/ },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?localIdentName=[name]__[local]___[hash:base64:5]!cssnext-loader!postcss-loader')
      }
    ]
  },

  postcss: [ postcss_local_scope ],
  cssnext: {
    from: srcDir + '/css/main.css'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },

  plugins: [
    new ExtractTextPlugin("style.css", { allChunks: true })
  ]
};

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');
const markdownPlugin = require('markdown-html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/header.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
     contentBase: './public',
     hot: true
    },
  plugins: [
  new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }]),
    new WebpackAutoInject(),
    new webpack.NamedModulesPlugin(),
    new markdownPlugin({
        filePath: '../src/markdown/',
        exportPath: '../public',
        isEncodeName: false, // if need to encode file name, like chinese
        template: '../src/index.html'
      }),
     new webpack.HotModuleReplacementPlugin()
  ],
  module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.html$/,use:['html-loader']}
       ]
    }
};
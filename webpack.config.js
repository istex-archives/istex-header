const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/header.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }])
  ],
  module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.html$/,use:['html-loader']}
       ]
    }
};
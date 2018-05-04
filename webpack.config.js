const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },
  module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.html$/,use:['html-loader']}
       ]
    }
};
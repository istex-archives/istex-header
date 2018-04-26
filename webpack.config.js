const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },
  module:{
        rules:[
            {
                test:/main\.css$/,
                use:['style-loader','css-loader']
            }
       ]
    }
};
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./public/app",
    output: {        
        filename: "../js/build.js"
    },

      module: {
    rules: [
     
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
         options: {
          presets: ['env']
        },
      },
       {        
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
    ],
  },

  
}

// fichier webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const PRODUCTION = 'false';

module.exports = {

  entry: './scripts/pong.js',
  //mode : 'production',
  output: {
    path: (PRODUCTION ? path.resolve('server', 'public') : path.resolve(__dirname, 'dist')),
    filename: 'scripts/bundle.js'
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
    static: {
       publicPath: path.resolve(__dirname, 'dist'),
       watch : true
    },
    host: 'localhost',
    port : 8081,
    open : true
  },

  module: {
    rules : [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },


      {
        test: /\.(png|jpg|gif)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name : '[name].[ext]',
              outputPath : 'images'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    
    new CopyPlugin({
	    patterns: [
		    {
          from: 'images/*',
          to:  'images/[name][ext]'
		    },
        {
            from: 'style/*',
            to:  'style/[name][ext]'
        },        
	    ]
	  })
  ]
}; 
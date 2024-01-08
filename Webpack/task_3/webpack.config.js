const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './modules/header/header.js',
    './modules/body/body.js',
    './modules/footer/footer.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Task 3' }),
    new CleanWebpackPlugin(),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      /* {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          // 'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }, */
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'pubic'),
    },
    port: 8564,
  },
};

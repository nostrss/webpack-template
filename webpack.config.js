const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: { index: '/src/index.js', about: '/src/about.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // injects the css into the DOM
          { loader: 'style-loader' },
          // translates CSS into JS
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWepackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index'],
    }),
    new HtmlWepackPlugin({
      template: './src/about.html',
      filename: './about.html',
      chunks: ['about'],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};

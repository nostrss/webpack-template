const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { index: '/src/index.ts', about: '/src/about.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    clean: true,
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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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

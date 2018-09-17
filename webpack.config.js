const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
          },
          { loader: 'sass-loader' }
        ]
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};

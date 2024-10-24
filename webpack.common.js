const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
    blog: './js/blog.js',
    home: './js/home.js',
    interactive_portfolio: './js/interactive_portfolio.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'css'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};

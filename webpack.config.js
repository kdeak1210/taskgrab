const path = require('path')

module.exports = {

  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  }

}
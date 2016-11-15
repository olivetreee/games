// webpack.config.js

module.exports = {
  //Entry and output points
  entry: './lib/2048.js',
  output: {
    path: './',
    filename: './lib/bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/], //for files ending in this...
        exclude: /(node_modules)/, //exclude node_modules
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  devtool: 'source-map', //Get line references when errors are raised
  resolve: {
    extensions: ['', '.js' ] //so you can type require "/lib/MyClass" and ommit the .js
  }
};

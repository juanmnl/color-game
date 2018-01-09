const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, '/src/app'),
  build: path.join(__dirname, 'dist')
};

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: ['/node_modules']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: path.join(PATHS.build, 'images/')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: __dirname + '/src/public/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('styles.css') // extract css to a separate file called styles.css
  ],
  devServer: {
    // configuration for webpack-dev-server
    contentBase: './src/public', //source of static assets
    port: 9200, // port to run dev-server
    stats: 'errors-only',
    overlay: {
      errors: true,
      warnings: true
    }
  }
};

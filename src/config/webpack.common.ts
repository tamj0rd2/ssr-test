import { resolveFromRoot } from '../server/helper'
import webpack from 'webpack'

const excludePattern = /node_modules/

const config: webpack.Configuration = {
  entry: [resolveFromRoot('src', 'client')],
  output: {
    path: resolveFromRoot('dist', 'public'),
    filename: 'client.bundle.js',
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: excludePattern,
        use: 'babel-loader',
      },
    ],
  },
}

export default config

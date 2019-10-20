// TODO: add rules around this.
// config can only import from itself
// client should only ever import from itself or config
// server can import from anything
import { resolveFromRoot } from '../server/helper'
import LoadablePlugin from '@loadable/webpack-plugin'
import { Configuration } from 'webpack'

const excludePattern = /node_modules/

const config: Configuration = {
  entry: [resolveFromRoot('src', 'client')],
  output: {
    path: resolveFromRoot('dist', 'public'),
    filename: 'client.bundle.js',
    chunkFilename: '[name].chunk.js',
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new LoadablePlugin({
      outputAsset: false,
      writeToDisk: {
        filename: resolveFromRoot('dist'),
      },
    }),
  ],
}

export default config

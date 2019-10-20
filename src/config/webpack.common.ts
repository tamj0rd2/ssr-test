import LoadablePlugin from '@loadable/webpack-plugin'
import { Configuration } from 'webpack'
import privatePaths from './privatePaths'

const excludePattern = /node_modules/

const config: Configuration = {
  entry: [privatePaths.clientSrc],
  output: {
    path: privatePaths.public,
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
        filename: privatePaths.dist,
      },
    }),
  ],
}

export default config

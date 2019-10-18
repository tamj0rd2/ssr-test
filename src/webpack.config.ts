import { resolveFromRoot } from './server/helper'
import webpack from 'webpack'

const excludePattern = /node_modules/

type WebpackConfig = Partial<webpack.Configuration> & {
  entry: string[]
  plugins: webpack.Plugin[]
  output: webpack.Output & {
    publicPath: string
  }
}

const clientConfig: WebpackConfig = {
  mode: 'production',
  entry: [resolveFromRoot('src', 'client')],
  output: {
    path: resolveFromRoot('dist', 'public'),
    filename: 'client.bundle.js',
    chunkFilename: '[name].bundle.js',
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
  plugins: [],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

if (process.env.NODE_ENV !== 'production') {
  clientConfig.mode = 'development'
  clientConfig.devtool = 'inline-source-map'
  clientConfig.entry = [...clientConfig.entry, 'webpack-hot-middleware/client']
  clientConfig.plugins = [
    ...clientConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
}

export default clientConfig

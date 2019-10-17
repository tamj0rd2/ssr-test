import { resolveFromRoot } from './helper'
import webpack from 'webpack'

const excludePattern = /node_modules/

type WebpackConfig = Partial<webpack.Configuration> & {
  entry: string[]
  plugins: webpack.Plugin[]
  output: webpack.Output & {
    publicPath: string
  }
}

export default function createConfig(isProd: boolean): WebpackConfig {
  const config: WebpackConfig = {
    mode: 'production',
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
        {
          test: /\.html$/,
          exclude: excludePattern,
          use: 'raw-loader',
        },
      ],
    },
    plugins: [],
  }

  if (!isProd) {
    config.mode = 'development'
    config.devtool = 'inline-source-map'
    config.entry = [...config.entry, 'webpack-hot-middleware/client']
    config.plugins = [...config.plugins, new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]
  }

  return config
}

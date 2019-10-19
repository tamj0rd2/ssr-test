import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../config/webpack.dev'

const compiler = webpack(config)

export const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config!.output!.publicPath!,
})

export const hotMiddleware = webpackHotMiddleware(compiler)

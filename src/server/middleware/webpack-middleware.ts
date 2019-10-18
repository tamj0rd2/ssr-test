import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import clientConfig from '../../webpack.config'

const compiler = webpack(clientConfig)

export const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: clientConfig.output.publicPath,
})

export const hotMiddleware = webpackHotMiddleware(compiler)

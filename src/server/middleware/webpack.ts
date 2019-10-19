import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import createConfig from '../../webpack.config'

const config = createConfig('development')
const compiler = webpack(config)

export const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
})

export const hotMiddleware = webpackHotMiddleware(compiler)

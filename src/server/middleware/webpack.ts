import { RequestHandler } from 'express'
import webpack from 'webpack'
import config from '../../config/webpack.dev'
import { resolveFromRoot } from '../helper'

const getWebpackMiddlewares = async (isDev: boolean) => {
  const devMiddlewares: RequestHandler[] = []

  if (isDev) {
    const { default: webpackDevMiddleware } = await import('webpack-dev-middleware')
    const { default: webpackHotMiddleware } = await import('webpack-hot-middleware')

    const compiler = webpack(config)

    const devMiddleware = webpackDevMiddleware(compiler, {
      publicPath: config!.output!.publicPath!,
    })
    const hotMiddleware = webpackHotMiddleware(compiler)

    const clientRoot = resolveFromRoot('dist', 'client')
    const clientJsDecacheMiddleware: RequestHandler = (req, res, next) => {
      Object.keys(require.cache)
        .filter(mod => mod.startsWith(clientRoot))
        .forEach(mod => {
          delete require.cache[mod]
        })
      next()
    }

    devMiddlewares.push(devMiddleware, hotMiddleware, clientJsDecacheMiddleware)
  }

  const statsMiddleware: RequestHandler = (req, res, next) => {
    next()
  }

  return [...devMiddlewares, statsMiddleware]
}

export default getWebpackMiddlewares

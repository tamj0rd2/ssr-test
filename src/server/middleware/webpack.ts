import { RequestHandler } from 'express'
import webpack from 'webpack'
import config from '../../config/webpack.dev'
import { resolveFromRoot } from '../helper'
import { readFileSync } from 'fs'

const getStats = (): object =>
  JSON.parse(readFileSync(resolveFromRoot('dist', 'loadable-stats.json')).toString())

const getProdMiddlewares = (): RequestHandler[] => {
  const stats = getStats()
  const statsMiddleware: RequestHandler = (req, res, next) => {
    res.locals.loadableStats = stats
    next()
  }

  return [statsMiddleware]
}

const getDevMiddlewares = async (): Promise<RequestHandler[]> => {
  const { default: webpackDevMiddleware } = await import('webpack-dev-middleware')
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware')

  const compiler = webpack(config)

  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config!.output!.publicPath!,
    serverSideRender: true,
  })

  const hotMiddleware = webpackHotMiddleware(compiler)

  const statsMiddleware: RequestHandler = (req, res, next) => {
    res.locals.loadableStats = getStats()
    next()
  }

  const clientRoot = resolveFromRoot('dist', 'client')
  const clientJsDecacheMiddleware: RequestHandler = (req, res, next) => {
    Object.keys(require.cache)
      .filter(mod => mod.startsWith(clientRoot))
      .forEach(mod => {
        delete require.cache[mod]
      })
    next()
  }

  return [devMiddleware, hotMiddleware, statsMiddleware, clientJsDecacheMiddleware]
}

const getWebpackMiddlewares = async (isDev: boolean): Promise<RequestHandler[]> => {
  return isDev ? await getDevMiddlewares() : getProdMiddlewares()
}

export default getWebpackMiddlewares

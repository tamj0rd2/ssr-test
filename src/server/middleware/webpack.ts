import { RequestHandler } from 'express'
import webpack from 'webpack'
import config from '../../config/webpack.dev'
import { readFileSync } from 'fs'
import privatePaths from '../../config/privatePaths'

const getStats = (): object => JSON.parse(readFileSync(privatePaths.stats).toString())

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
    publicPath: config.output!.publicPath!,
    stats: config.stats,
  })

  const hotMiddleware = webpackHotMiddleware(compiler)

  const statsMiddleware: RequestHandler = (req, res, next) => {
    res.locals.loadableStats = getStats()
    next()
  }

  const clientRoot = privatePaths.clientDist
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

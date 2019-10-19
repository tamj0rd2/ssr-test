import { RequestHandler } from 'express'
import webpack, { Stats } from 'webpack'
import config from '../../config/webpack.dev'
import { resolveFromRoot } from '../helper'
import { readFileSync, readFile } from 'fs'
import { Response } from 'express-serve-static-core'

const getProdMiddlewares = (): RequestHandler[] => {
  const statsContent = readFileSync(resolveFromRoot('dist', 'public', 'stats.json')).toString()
  const stats: Stats.ToJsonOutput = JSON.parse(statsContent)

  const statsMiddleware: RequestHandler = (req, res, next) => {
    // TODO: how can we get this to just give back the chunks our request/page requires?
    res.locals.bundlesToLoad = Object.values(stats.assetsByChunkName as {})
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

  const statsMiddleware: RequestHandler = (req, res: Response, next) => {
    res.locals.bundlesToLoad = Object.values(res.locals.webpackStats.toJson().assetsByChunkName)
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

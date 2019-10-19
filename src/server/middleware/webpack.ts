import { RequestHandler } from 'express'
import webpack from 'webpack'
import config from '../../config/webpack.dev'
import { resolveFromRoot } from '../helper'
import { Response } from 'express-serve-static-core'

const getWebpackMiddlewares = async (isDev: boolean) => {
  const devMiddlewares: RequestHandler[] = []

  if (isDev) {
    const { default: webpackDevMiddleware } = await import('webpack-dev-middleware')
    const { default: webpackHotMiddleware } = await import('webpack-hot-middleware')

    const compiler = webpack(config)

    const devMiddleware = webpackDevMiddleware(compiler, {
      publicPath: config!.output!.publicPath!,
      serverSideRender: true,
    })

    const hotMiddleware = webpackHotMiddleware(compiler)

    const chunksMiddleware: RequestHandler = (req, res: Response, next) => {
      res.locals.bundlesToLoad = Object.values(res.locals.webpackStats.toJson().assetsByChunkName)
      console.log(res.locals.bundlesToLoad)
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

    devMiddlewares.push(devMiddleware, hotMiddleware, chunksMiddleware, clientJsDecacheMiddleware)
  }

  return [...devMiddlewares]
}

export default getWebpackMiddlewares

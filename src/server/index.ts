import express, { ErrorRequestHandler } from 'express'
import MarkupThingy from './markup-thingy'
import { resolveFromRoot } from './helper'
import createRouter from './middleware/router'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import App from '../client/App'
import getWebpackMiddlewares from './middleware/webpack'

const configureApp = async (isDev: boolean) => {
  const app = express()
  const port = 3000

  const webpackMiddlewares = await getWebpackMiddlewares(isDev)
  webpackMiddlewares.forEach(middleware => app.use(middleware))

  app.use('/public', express.static(resolveFromRoot('dist', 'public'), { maxAge: '30d' }))

  const template = readFileSync(resolve(__dirname, 'template.html')).toString()
  const markupThingy = new MarkupThingy(
    template,
    isDev ? async () => (await import('../client/App')).default : async () => App,
  )

  app.use(createRouter(markupThingy))

  app.use(<ErrorRequestHandler>async function(err, req, res, next) {
    return res.headersSent
      ? next(err)
      : res
          .status(500)
          .send(await markupThingy.createAppMarkup({ errorStatusCode: 500 }, res.locals.bundlesToLoad))
  })

  app.use(async (_, res) => {
    res
      .status(404)
      .send(await markupThingy.createAppMarkup({ errorStatusCode: 404 }, res.locals.bundlesToLoad))
  })

  app.listen(port, () => console.log(`App listening on port ${port}`))
}

configureApp(process.env.NODE_ENV !== 'production')

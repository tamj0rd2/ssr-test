import express, { ErrorRequestHandler } from 'express'
import MarkupThingy from './markup-thingy'
import { resolveFromRoot } from './helper'
import createRouter from './middleware/router'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import App from '../client/App'

const configureApp = async (isDev: boolean) => {
  const app = express()
  const port = 3000

  let getApp = () => App

  if (isDev) {
    const { devMiddleware, hotMiddleware } = await import('./middleware/webpack')
    app.use(devMiddleware)
    app.use(hotMiddleware)

    const clearModule = (await import('clear-module')).default
    getApp = () => {
      clearModule.match(/\/client\/App/)
      return require('../client/App').default
    }
  }

  app.use('/public', express.static(resolveFromRoot('dist', 'public'), { maxAge: '30d' }))

  const template = readFileSync(resolve(__dirname, 'template.html')).toString()
  const markupThingy = new MarkupThingy(template, getApp)

  app.use(createRouter(markupThingy))

  app.use(<ErrorRequestHandler>function(err, req, res, next) {
    return res.headersSent
      ? next(err)
      : res.status(500).send(markupThingy.createAppMarkup({ errorStatusCode: 500 }))
  })

  app.use((_, res) => {
    res.status(404).send(markupThingy.createAppMarkup({ errorStatusCode: 404 }))
  })

  app.listen(port, () => console.log(`App listening on port ${port}`))
}

configureApp(process.env.NODE_ENV !== 'production')

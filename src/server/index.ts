import express from 'express'
import MarkupThingy from './markup-thingy'
import createRouter from './middleware/router'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import App from '../client/App'
import getWebpackMiddlewares from './middleware/webpack'
import createErrorHandlers from './middleware/error-handling'
import privatePaths from '../config/privatePaths'

const configureApp = async (isDev: boolean) => {
  const app = express()
  const port = 3000

  const webpackMiddlewares = await getWebpackMiddlewares(isDev)
  webpackMiddlewares.forEach(middleware => app.use(middleware))

  app.use('/public', express.static(privatePaths.public, { maxAge: '30d' }))

  const template = readFileSync(resolve(__dirname, 'template.html')).toString()
  const markupThingy = new MarkupThingy(
    template,
    isDev ? async () => (await import('../client/App')).default : async () => App,
  )

  app.use(createRouter(markupThingy))

  createErrorHandlers(markupThingy).forEach(middleware => app.use(middleware))

  app.listen(port, () => console.log(`App listening on port ${port}`))
}

configureApp(process.env.NODE_ENV !== 'production')

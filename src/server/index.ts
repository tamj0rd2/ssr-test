import express, { ErrorRequestHandler } from 'express'
import MarkupThingy from './markup-thingy'
import { resolveFromRoot } from './helper'
import createRouter from './middleware/router'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const app = express()
const port = 3000

function configureApp() {
  app.use('/public', express.static(resolveFromRoot('dist', 'public'), { maxAge: '30d' }))

  const template = readFileSync(resolve(__dirname, 'template.html')).toString()
  const markupThingy = new MarkupThingy(template)

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

if (process.env.NODE_ENV === 'production') {
  configureApp()
} else {
  import('./middleware/webpack').then(({ devMiddleware, hotMiddleware }) => {
    app.use(devMiddleware)
    app.use(hotMiddleware)
    configureApp()
  })
}

import express from 'express'
import createRenderer from './renderer'
import { resolveFromRoot } from './helper'
import errorHandler from './middleware/error-middleware'

const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  const { devMiddleware, hotMiddleware } = require('./middleware/webpack-middleware')
  app.use(devMiddleware)
  app.use(hotMiddleware)
}

app.use('/public', express.static(resolveFromRoot('dist', 'public'), { maxAge: '30d' }))

app.get('^/$', createRenderer())

app.use(errorHandler)

// TODO: figure out error handling

app.listen(port, () => console.log(`App listening on port ${port}`))

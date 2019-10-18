import express from 'express'
import createRenderer from './renderer'
import clientConfig from '../webpack.config'
import { resolveFromRoot } from './helper'

const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  console.log('Starting server in DEV mode')

  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  const compiler = webpack(clientConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath,
    }),
  )

  app.use(webpackHotMiddleware(compiler))
}

app.get('^/$', createRenderer())
app.use('/public', express.static(resolveFromRoot('dist', 'public'), { maxAge: '30d' }))

app.listen(port, () => console.log(`App listening on port ${port}`))

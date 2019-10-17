import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import createRenderer from './renderer'
import createClientConfig from './webpack.config'
import { resolveFromRoot } from './helper'

const app = express()
const port = 3000

const clientConfig = createClientConfig(process.env.NODE_ENV === 'production')
const compiler = webpack(clientConfig)

if (process.env.NODE_ENV === 'production') {
  console.log('COMPILING THE PROD VERSION')
  compiler.run((err, stats) => {
    console.dir('err:', err)
    console.dir('stats:', stats)
  })
} else {
  console.log('USING DEV MIDDLEWARE')

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

// TODO: everywhere, use import() for things that may/may not get imported based on env

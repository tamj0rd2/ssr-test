import express from 'express'
import createRouter from './router'
import devMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import createRenderer from './renderer'
import webpackConfig from './webpack.config'
import { resolveFromRoot } from './helper'
import { resolve } from 'path'

const app = express()
const port = 3000

const compiler = webpack(webpackConfig)
if (process.env.NODE_ENV === 'production') {
    console.log('COMPILING THE PROD VERSION')
    compiler.run((err, stats) => {
        console.dir('err:', err)
        console.dir('stats:', stats)
    })
} else {
    console.log('USING DEV MIDDLEWARE')
    
    app.use(devMiddleware(compiler, {
        publicPath: '/public/',
    }))
}

app.get('^/$', createRenderer())
app.get('/hello', (req, res) => res.status(200).send('yo!'))

app.use('/public', express.static(resolveFromRoot('dist', 'public'), { maxAge: '30d' }))

app.listen(port, () => console.log(`App listening on port ${port}`))

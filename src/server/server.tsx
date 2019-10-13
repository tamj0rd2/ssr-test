import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../client/App'

const app = express()
const port = 3000

const router = express.Router()

const serverRenderer = (_, res) => {
    fs.readFile(path.resolve('./dist/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Failed reading index.html')
        }

        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
            )
        )
    })
}

router.use('^/$', serverRenderer)

router.use(
    '/public',
    express.static('.' + path.resolve(__dirname, '../..', 'dist'), { maxAge: '30d' })
)

app.use(router)

app.listen(port, () => console.log(`App listening on port ${port}`))

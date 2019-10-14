import path from 'path'

import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import App from '../client/App'
import template from './template.html'

const app = express()
const port = 3000

const router = express.Router()

const serverRenderer = (_, res) => {

    const sheet = new ServerStyleSheet()
    try {
        const html = renderToString(sheet.collectStyles(<App />))
        const styleTags = sheet.getStyleTags()

        return res.send(
            template
                .replace(
                    '<style></style>',
                    styleTags || ''
                )
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${html}</div>`
                )
        )
    }
    catch (err) {
        return res.status(500).send('Error loading styles')
    }
}

router.use('^/$', serverRenderer)

router.use('/api/hello', (req, res) => {
    return res.status(200).send('Hello, from your API!')
})

router.use(
    '/public',
    express.static('.' + path.resolve(__dirname, '../..', 'dist'), { maxAge: '30d' })
)

app.use(router)

app.listen(port, () => console.log(`App listening on port ${port}`))

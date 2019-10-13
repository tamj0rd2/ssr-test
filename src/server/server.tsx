import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../client/App'
import { ServerStyleSheet } from 'styled-components';

const app = express()
const port = 3000

const router = express.Router()

const serverRenderer = (_, res) => {
    fs.readFile(path.resolve('./dist/template.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Failed reading template.html')
        }

        const sheet = new ServerStyleSheet()
        try {
            const html = renderToString(sheet.collectStyles(<App />))
            const styleTags = sheet.getStyleTags()

            return res.send(
                data
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
    })
}

router.use('^/$', serverRenderer)

router.use('/api/hello', (req, res) => {
    return res.status(200).send('Hello, from your API!')
})

// TODO: try to see if I can serve the invididual client.bundle.js. not sure how that would work with code splitting though
router.use(
    '/public',
    express.static('.' + path.resolve(__dirname, '../..', 'dist'), { maxAge: '30d' })
)

app.use(router)

app.listen(port, () => console.log(`App listening on port ${port}`))

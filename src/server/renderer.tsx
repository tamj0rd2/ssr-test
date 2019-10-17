import { ServerStyleSheet } from "styled-components"
import { renderToString } from "react-dom/server"
import React from "react"
import { readFileSync } from "fs"
import { resolve } from "path"

import App from '../client/App'
import { RequestHandler } from "express"

const createRenderer = (): RequestHandler => {
    const template = readFileSync(resolve(__dirname, 'template.html')).toString()
    
    return (_, res) => {
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
}

export default createRenderer

import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import App from '../client/App'
import { RequestHandler } from 'express'

const createRenderer = (): RequestHandler => {
  const template = readFileSync(resolve(__dirname, 'template.html')).toString()

  return (_, res, next) => {
    const sheet = new ServerStyleSheet()
    try {
      const componentMarkup = renderToString(sheet.collectStyles(<App />))
      const styleTags = sheet.getStyleTags()
      sheet.seal()

      // we could use some cool templating thingy instead
      // TODO: could use res.render to render an actual template with some options
      const html = template
        .replace('<style></style>', styleTags || '')
        .replace('<div id="root"></div>', `<div id="root">${componentMarkup}</div>`)

      return res.send(html)
    } catch (err) {
      next(err)
    }
  }
}

export default createRenderer

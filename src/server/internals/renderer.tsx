import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { RequestHandler } from 'express'
import { Request, Response, Dictionary } from 'express-serve-static-core'
import App from '../../client/App'

const template = readFileSync(resolve(__dirname, '..', 'template.html')).toString()

export default function renderComponent<P>(
  Component: React.FC<P>,
  getProps: (req: Request<Dictionary<string>>, res: Response) => Promise<P>,
): RequestHandler {
  return async (req, res, next) => {
    const sheet = new ServerStyleSheet()
    try {
      const initialProps = await getProps(req, res)
      const html = renderToString(
        sheet.collectStyles(
          <App data={{}}>
            <Component {...initialProps} />
          </App>,
        ),
      )
      const styleTags = sheet.getStyleTags()

      return res.send(
        template
          .replace('<script></script>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialProps)}</script>`)
          .replace('<style></style>', styleTags || '')
          .replace('<div id="root"></div>', `<div id="root">${html}</div>`),
      )
    } catch (err) {
      next(err)
    }
  }
}

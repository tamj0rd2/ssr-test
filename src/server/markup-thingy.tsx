import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import App, { AppProps } from '../client/App'

class MarkupThingy {
  private readonly template: string

  constructor(template: string) {
    this.template = template
  }

  public createAppMarkup(props: AppProps) {
    const sheet = new ServerStyleSheet()
    const componentMarkup = renderToString(sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleTags()
    sheet.seal()

    const html = this.template
      .replace('{title}', 'My super cool app')
      .replace('{styles}', styleTags || '')
      .replace(
        '{initialProps}',
        `<script>window.__INITIAL_PROPS__ = ${JSON.stringify(props)}</script>`,
      )
      .replace('{reactRoot}', `<div id="root">${componentMarkup}</div>`)

    return html
  }
}

export default MarkupThingy

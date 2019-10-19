import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import App, { AppProps } from '../client/App'

class MarkupThingy {
  private readonly template: string
  private readonly getAppComponent: () => React.FunctionComponent<AppProps>

  constructor(template: string, getApp: () => typeof App) {
    this.template = template
    this.getAppComponent = getApp
  }

  public createAppMarkup(props: AppProps) {
    const sheet = new ServerStyleSheet()
    const AppComponent = this.getAppComponent()
    const componentMarkup = renderToString(sheet.collectStyles(<AppComponent {...props} />))
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

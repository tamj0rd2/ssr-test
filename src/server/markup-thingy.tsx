import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import App, { AppProps } from '../client/App'

class MarkupThingy {
  private readonly template: string
  private readonly getAppComponent: () => Promise<typeof App>

  constructor(template: string, getAppComponent: () => Promise<typeof App>) {
    this.template = template
    this.getAppComponent = getAppComponent
  }

  public async createAppMarkup(props: AppProps, scriptNames: string[] = []) {
    const sheet = new ServerStyleSheet()
    const AppComponent = await this.getAppComponent()
    const componentMarkup = renderToString(sheet.collectStyles(<AppComponent {...props} />))
    const styleTags = sheet.getStyleTags()
    sheet.seal()

    const html = this.template
      .replace('{title}', 'My super cool app')
      .replace('{styles}', styleTags || '')
      .replace('{reactRoot}', `<div id="root">${componentMarkup}</div>`)
      .replace(
        '{initialProps}',
        this.createScriptTag(false, `window.__INITIAL_PROPS__ = ${JSON.stringify(props)}`),
      )
      // TODO: why isn't each bundle just require what it needs instead of making me add it myself?
      .replace('{scripts}', scriptNames.map(name => this.createScriptTag(true, name)).join())

    return html
  }

  private createScriptTag(isSrc: boolean, value: string): string {
    return isSrc
      ? `<script type="text/javascript" src="/public/${value}"></script>`
      : `<script type="text/javascript">${value}</script>`
  }
}

export default MarkupThingy

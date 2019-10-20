import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import App, { AppProps } from '../client/App'

class AppMarkup {
  private readonly template: string
  private readonly getAppComponent: () => Promise<typeof App>

  constructor(template: string, getAppComponent: () => Promise<typeof App>) {
    this.template = template
    this.getAppComponent = getAppComponent
  }

  public async createHtml(props: AppProps, stats: object) {
    const AppComponent = await this.getAppComponent()
    const extractor = new ChunkExtractor({ stats })
    const sheet = new ServerStyleSheet()

    const componentMarkup = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <StyleSheetManager sheet={sheet.instance}>
          <AppComponent {...props} />
        </StyleSheetManager>
      </ChunkExtractorManager>,
    )

    const scriptTags = extractor.getScriptTags()
    const styleTags = sheet.getStyleTags()
    sheet.seal()

    const html = this.template
      .replace('{title}', 'My super cool app')
      .replace('{styles}', styleTags)
      .replace('{reactRoot}', `<div id="root">${componentMarkup}</div>`)
      .replace(
        '{initialProps}',
        `<script type="text/javascript">window.__INITIAL_PROPS__ = ${JSON.stringify(props)}</script>`,
      )
      .replace('{scripts}', scriptTags)

    return html
  }
}

export default AppMarkup

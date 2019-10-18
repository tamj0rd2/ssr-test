import React from 'react'
import { hydrate } from 'react-dom'
import App, { AppProps } from './App'

declare global {
  interface Window {
    __INITIAL_PROPS__: AppProps
  }
}

const hydrateApp = () =>
  hydrate(<App {...window.__INITIAL_PROPS__} />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./App', hydrateApp)
}

hydrateApp()

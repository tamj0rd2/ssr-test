import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App, { AppProps } from './App'

declare global {
  interface Window {
    __INITIAL_PROPS__: AppProps
  }
}

loadableReady(() => {
  const root = document.getElementById('root')
  const hydrateApp = () => hydrate(<App {...window.__INITIAL_PROPS__} />, root)

  if (module.hot) {
    module.hot.accept('./App', hydrateApp)
  }

  hydrateApp()
})

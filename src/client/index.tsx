import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

const hydrateApp = () => hydrate(<App />, document.getElementById('root'))
hydrateApp()

if (module.hot) {
  module.hot.accept('./App', hydrateApp)
}

// TODO: figure out the gotchas https://webpack.js.org/guides/hot-module-replacement/#gotchas
// TODO: fix the warning about text mismatch after reloading page
// TODO: fix event handlers
// TODO: figure out debugging the server >:(

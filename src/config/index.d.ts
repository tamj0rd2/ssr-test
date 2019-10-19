declare module 'webpack-stats-plugin' {
  import { Plugin, Options } from 'webpack'

  interface StatsWriterOptions {
    filename?: string
    stats?: Options.Stats
  }

  class StatsWriterPlugin extends Plugin {
    constructor(opts: StatsWriterOptions)
  }
}

import merge from 'webpack-merge'
import common from './webpack.common'
import { StatsWriterPlugin } from 'webpack-stats-plugin'

const config = merge(common, {
  mode: 'production',
  stats: {
    chunks: true,
  },
  plugins: [
    new StatsWriterPlugin({
      filename: 'stats.json',
    }),
  ],
})

export default config

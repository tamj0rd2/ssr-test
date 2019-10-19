import merge from 'webpack-merge'
import common from './webpack.common'

const config = merge(common, {
  mode: 'production',
  output: {
    chunkFilename: '[name].chunk.js',
  },
  // TODO: probably need to add some stats for these. middleware and stuff
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: {
    chunks: true,
  },
})

export default config

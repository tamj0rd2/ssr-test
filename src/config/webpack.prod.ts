import merge from 'webpack-merge'
import common from './webpack.common'

const config = merge(common, {
  mode: 'production',
  stats: {
    chunks: true,
  },
})

export default config

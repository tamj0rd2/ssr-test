import merge from 'webpack-merge'
import common from './webpack.common'
import webpack from 'webpack'

const config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['webpack-hot-middleware/client'],
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
})

export default config

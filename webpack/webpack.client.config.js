const commonConfig = require('./webpack.common.config')
const { resolve } = require('path')

module.exports = {
    ...commonConfig,
    name: 'client',
    entry: resolve(__dirname, '../src/client'),
    output: {
        path: resolve('../dist'),
        filename: 'client.bundle.js',
        publicPath: '/public/'
    }
}
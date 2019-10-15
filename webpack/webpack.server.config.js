const commonConfig = require('./webpack.common.config')
const { resolve } = require('path')

module.exports = {
    ...commonConfig,
    name: 'server',
    entry: resolve(__dirname, '../src/server'),
    target: 'node',
    output: {
        path: resolve(__dirname, '../dist'),
        filename: 'server.bundle.js',
    }
}

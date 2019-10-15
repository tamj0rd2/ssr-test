const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const mode = 'development'
const devtool = 'inline-source-map'

module.exports = [
    { ...serverConfig, mode, devtool },
    {
        ...clientConfig,
        mode,
        devtool,
        devServer: {
            openPage: 'public/index.html'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: resolve(__dirname, '../src', 'server', 'template.html'),
                inject: false
            }),
        ]
    },
]

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const [clientConfig] = require('./webpack.config')

module.exports = {
    ...clientConfig,
    devServer: {
        openPage: 'public/index.html'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'server', 'template.html'),
            inject: false
        }),
    ]
}

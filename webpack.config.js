const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isDev = process.env.NODE_ENV !== 'production'

const commonConfig = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : undefined,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
}

const distFolder = path.resolve(__dirname, 'dist')

module.exports = [
    {
        ...commonConfig,
        name: 'server',
        entry: './src/server',
        target: 'node',
        output: {
            path: distFolder,
            filename: 'server.bundle.js',
        },
    },
    {
        ...commonConfig,
        name: 'client',
        entry: './src/client',
        output: {
            path: distFolder,
            filename: 'client.bundle.js',
            publicPath: 'public'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/template.html',
                filename: 'template.html'
            })
        ]
    }
]
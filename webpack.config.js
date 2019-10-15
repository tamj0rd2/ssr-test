const path = require('path')

const excludePattern = /node_modules/

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
                exclude: excludePattern,
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                exclude: excludePattern,
                use: 'raw-loader'
            }
        ]
    }
}

const distFolder = path.resolve(__dirname, 'dist')

const clientConfig = {
    ...commonConfig,
    name: 'client',
    entry: './src/client',
    output: {
        path: distFolder,
        filename: 'client.bundle.js',
        publicPath: '/public/'
    }
}

const serverConfig = {
    ...commonConfig,
    name: 'server',
    entry: './src/server',
    target: 'node',
    output: {
        path: distFolder,
        filename: 'server.bundle.js',
    }
}

module.exports = [clientConfig, serverConfig]

import { resolveFromRoot } from "./helper"
import { Configuration } from "webpack"

const excludePattern = /node_modules/

const isProd = process.env.NODE_ENV === 'production'

const config: Configuration = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? undefined : 'inline-source-map',
    entry: resolveFromRoot('src', 'client'),
    output: {
        path: resolveFromRoot('dist', 'public'),
        filename: 'client.bundle.js',
        publicPath: '/public/'
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

export default config
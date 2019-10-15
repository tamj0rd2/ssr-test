const excludePattern = /node_modules/

module.exports = {
    output: {
        path: '../dist',
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

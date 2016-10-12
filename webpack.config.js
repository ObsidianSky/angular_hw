
module.exports = {
    entry: './app/app.js',
    output: {
        filename: './bundle.js'
    },
    devServer: {
        inline: true
    },
    watchOption: {
        aggregateTimeout: 100
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extension: ['', 'js']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader'],
        extensions: ['', '.js']
    }
}
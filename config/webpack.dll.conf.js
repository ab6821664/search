const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin  } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['vue','vue-router','vuex']
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        new CleanWebpackPlugin()
    ]
}
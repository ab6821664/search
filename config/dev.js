const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
console.log(path.resolve(process.cwd(), 'src') )
module.exports = {
    entry: {
      app:['./src/index.js'],
    },
    mode:'production',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(process.cwd(), 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                     'file-loader'
                ]
           },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            },
        ]
    },
    devtool:'inline-source-map',
    devServer:{
        contentBase: './../dist',
        host: '127.0.0.1',
        hot: true,
        port:9090,
        compress: true
    },
    resolve:{
        alias:{
           'components': path.resolve(process.cwd(), 'src/components'),
            'vue': 'vue/dist/vue.min.js'
       },
        extensions: [".vue",".js", ".json"]
    },
    plugins:[
     //   new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./index.html',
            favicon: './src/assets/img/title.ico',
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('./../public/vendor.dll.js')
        }),
    ],
};
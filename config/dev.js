const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
console.log(path.resolve(process.cwd(), 'src') )
module.exports = {
    entry: {
      app:'./src/index.js',
    },
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
            }
        ]
    },
    devtool:'inline-source-map',
    devServer:{
        contentBase: './../dist',
       // host: '106.18.67.224',
        hot: true,
        port:9090
    },
    resolve:{
        alias:{
           'components': path.resolve(process.cwd(), 'src/components'),
            'vue': 'vue/dist/vue.min.js'
       },
        extensions: [".vue",".js", ".json"]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./index.html'
        }),
        new VueLoaderPlugin(),
    ],
};
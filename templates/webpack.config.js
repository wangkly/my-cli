const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    optimization:{
        minimize: false,
        splitChunks:{
            automaticNameDelimiter: '~',
            cacheGroups:{
                commons:{
                    name:'commons',
                    chunks:'initial',
                    minChunks:2
                }
            }
        }
    },
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'[hash:8]-bundle.js',
        path:path.resolve(__dirname,'dist'),
        chunkFilename:'[name]-[hash:8].js'
    },
    module:{
        rules:[
            {
                test:/\.js/,
                exclude:/node_modules/,
                use:["babel-loader"]
            },
            {
                test:/.less/,
                use:["style-loader","css-loader","less-loader"]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.ejs'
        })
    ],
    devServer:{
        contentBase: path.join(__dirname,'dist'),
        port: 3000,
        hot:true
    }


}
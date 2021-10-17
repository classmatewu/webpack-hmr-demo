const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
      filename: "bundle.[hash:8].js",
      path: path.resolve(__dirname, "dist"),
  },
  devServer:{
    port:3000,
    hot:true,
    static:'./dist'
  },
  // watch:true,
  module:{
    rules:[{
        test:/\.vue$/,
        use:['vue-loader']
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader'] // 从右向左解析原则
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'./public/index.html')
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
  ],
}

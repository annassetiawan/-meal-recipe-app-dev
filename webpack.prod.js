const merge = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
 
module.exports = merge(common, {
   mode: "production",
   module: {
       rules: [
           {
               test: /\.scss$/,
               use: [
                MiniCssExtractPlugin.loader, // extact css into files
               "css-loader", //turn css into bundle js
               'sass-loader' //Turn Sass Into css
            ]
           },
           {
               test: /\.js$/,
               exclude: "/node_modules/",
               use: [
                   {
                       loader: "babel-loader",
                       options: {
                           presets: ["@babel/preset-env"]
                       }
                   }
               ]
           }
       ]
   },
   plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].css"
    })
]
})
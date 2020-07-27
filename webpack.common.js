const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
 
module.exports = {
   entry: "./src/app.js",
   output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js"
   },
   module: {
       rules: [
           
           {
            test: /\.html$/,
            use: ['html-loader']
           },
           {
            test: /\.(svg|png|jpg|gif)$/,
            use: [
            {
                loader:'file-loader',
                options:{
                    name:'[name].[ext]',
                    outputPath:'imgs'
                }
            },
            {
                loader: 'image-webpack-loader',
            }
        ]
           }
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           template: "./src/index.html",
           filename: "index.html",
           favicon: "./src/assets/favicon.png"

       })
   ]
}
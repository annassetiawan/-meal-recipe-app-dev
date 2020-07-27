const merge = require("webpack-merge");
const common = require("./webpack.common");
 
module.exports = merge(common, {
   mode: "development",
   module: {
      rules: [
          {
              test: /\.scss$/,
              use: [
               'style-loader', // inject styles into dom
              "css-loader", //turn css into bundle js
              'sass-loader' //Turn Sass Into css
           ]
          }
      ]}
})
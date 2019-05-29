const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const config = {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../build")
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: "/node_modules",
          use: ["babel-loader"]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    }    
  }
	if(options.mode === 'development') {
		// Development
    config.plugins = [
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html"        
        // title: 'Development',
        // showErrors: true
      })
    ];

    config.devtool = 'inline-source-map';

    config.devServer = {
      contentBase: path.resolve(__dirname, "../build"),
      index: "index.html",
      port: 9000      
    }
    // config.devServer = {
    //   hot: true, 
    //   host: '0.0.0.0', 
    //   port: 8080,
    //   contentBase: __dirname + "/public/",
    //   stats: {
    //     color: true
    //   }
    // };
	} else {
    // Production
    config.plugins = [
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        filename: "style.css"
      })      
    ];
	}	  

  return config;
}
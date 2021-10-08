const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    watch: true,
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    entry: "./src/index.js",
    output: {
        filename: "application.js",
        path: path.resolve(__dirname, 'build')
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'application.css'
    })],
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: [
                                            'last 3 versions',
                                            'ie >9'
                                        ]
                                    })
                                ]
                            }
                        }
                    },'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: false,
                            name: '[name].[hash:7].[ext]'
                        },
                    },
                ],
            }
        ],
    }
}
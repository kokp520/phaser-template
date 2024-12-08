// /Users/adiwu/repo/phaser-template/webpack.config.js
// Start of Selection
// 此配置的目的是為了設置 Webpack 以支持 Phaser 項目和 TypeScript。
// 它定義了入口點，優化了 Phaser 和 Phaser Editor 2D 的塊拆分，並配置了輸出設置。
// 模塊規則指定如何處理 TypeScript 和 JSON 文件，而 devServer 設置則啟用熱模塊替換並在端口 8080 打開應用程序。
// 插件用於生成 HTML 文件，清理輸出目錄，複製靜態資產，並啟用熱模塊替換。

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.ts"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                phaser: {
                    test: /[\\/]node_modules[\\/]phaser[\\/]/,
                    name: "phaser",
                    chunks: "all",
                },
                phasereditor2d: {
                    test: /[\\/]node_modules[\\/]@phasereditor2d[\\/]/,
                    name: "phasereditor2d",
                    chunks: "all",
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[contenthash].bundle.js",
        assetModuleFilename: "asset-packs/[name]-[hash][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.json/,
                type: "asset/resource",
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        historyApiFallback: true,
        allowedHosts: 'all',
        static: {
            directory: path.resolve(__dirname, "./dist"),
        },
        open: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            minify: false
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "static",
                    globOptions: {
                        // 資產包文件在代碼中作為模塊導入
                        ignore: ["**/publicroot", "**/*-pack.json"]
                    }
                }
            ]
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

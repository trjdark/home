/**
 * desc: 代码压缩优化
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/26
 * Time: 下午3:04
 */

const constants = require('./constants');
const config = require('./config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports =
    constants.APP_ENV === 'dev'
        ? {}
        : {
            runtimeChunk: {
                name: 'manifest'
            },
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: config.sourceMap,
                    uglifyOptions: {
                        ie8: false,
                        mangle: true,
                        output: { comments: false },
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            unused: false,
                        },
                    },
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        reduceIdents: false,
                        autoprefixer: false
                    }
                }),
                new CompressionPlugin()
            ]
        };
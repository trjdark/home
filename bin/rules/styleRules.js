const path = require('path');
const config = require('./../config');
const { resolve } = require('./../untils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const theme = re

// sass 配置
const sassLoader = {
    loader: 'sass-loader',
    options: {
        includePaths: [require('bourbon').includePaths, resolve('src/styles')]
    }
};
// less 配置
const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
        // modifyVars: theme
        modifyVars: {
            'primary-color': '#ef7421',
            'link-color': '#ef7421',
        }
    }
}
// 缓存
const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // provide a cache directory where cache items should be stored
        cacheDirectory: resolve('.cache-loader')
    }

};

module.exports = [
    {
        test: /\.css$/,
        use: [
            config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cacheLoader,
            'css-loader',
            'postcss-loader'
        ]
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    sassLoader
                ]
            }
        ]
    },
    {
        // for ant design
        test: /\.less$/,
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    lessLoader
                ]
            }
        ]
    }
];

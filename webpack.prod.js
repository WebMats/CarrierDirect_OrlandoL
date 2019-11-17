const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const prefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge.smart(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunckFilename: '[id].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { 
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [prefixer]
                        }
                    },
                ]
            }
        ]
    }
});

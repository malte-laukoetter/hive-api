const path = require('path');
const webpack = require('webpack');
const UglifyESPlugin = require('uglify-es-webpack-plugin');

module.exports = {
    entry: './build/lib/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hive.min.js',
        libraryTarget: 'umd',
        library: 'hive'
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
            /CacheFetch\.js/,
            '../../CacheFetch_web.js'
        ),
        new UglifyESPlugin({
            mangle: false
        })
    ]
};
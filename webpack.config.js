var path = require('path');
var webpack = require('webpack');
// var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // externals: {
    //     Vue: './src/js/lib/vue.min.js',
    //     vr: './src/js/lib/vue-resource.min.js'
    // },
    entry: {
        cart: './src/js/cart',
        address: './src/js/address'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'vue'
        })
    ]
};

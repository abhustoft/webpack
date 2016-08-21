var path = require('path');
var SRC = path.join(__dirname, 'src/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');
var webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

var definePlugin = new webpack.DefinePlugin({
    PROD: JSON.stringify(JSON.parse(process.env.PROD || 'false'))
});

var config = {
    entry: {
        Index: './src/index.js',
        Shout: './src/shout.js'
    },       // entry points
    output: {                     // output folder
        path: './dist',           // folder path
        filename: '[name].js'     // file names
    },
    resolve: {
        root: [SRC, NODE_MODULES],                  // root folders for Webpack resolving, so we can now call require('greet')
        alias: {
            'actions': path.join(SRC, 'actions/'),    // sample alias, calling require('actions/file') will resolve to ./src/actions/file.js
            // ...
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/, 
                loader: "eslint-loader", 
                exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',      // note that specifying 'babel' or 'babel-loader' is equivalent for Webpack
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css' // Note that the order is important here, it means that 'style-loader' will be applied to the ouput of 'css-loader'
            }
        ]
    },
    plugins: [
        definePlugin,
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']})
    ],
    eslint: {
        configFile: '.eslintrc'
    }
};

module.exports = config;
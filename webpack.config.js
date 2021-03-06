var path = require('path');
var SRC = path.join(__dirname, 'src/');
var images = path.join(__dirname, 'src/', 'image/');
var styles = path.join(__dirname, 'src/', 'style/');
var fonts = path.join(__dirname, 'src/', 'fonts/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');
var webpack = require('webpack');
var WebpackStripLoader = require('strip-loader');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

var definePlugin = new webpack.DefinePlugin({
    PROD: JSON.stringify(JSON.parse(process.env.PROD || 'false'))
});

var stripLoader = {
    test: [/\.js$/, /\.es6$/],
    exclude: /node_modules/,
    loader: WebpackStripLoader.loader('console.log')
};

var config = {
    entry: {
        Index: './src/index.js',
        Shout: './src/js/shout.js'
    },
    output: {                     // output folder
        path: './dist',           // folder path
        filename: '[name].js',     // file names
        publicPath: './dist/'
    },
    resolve: {
        root: [SRC, NODE_MODULES],                  // root folders for Webpack resolving, so we can now call require('greet')
        alias: {
            'actions': path.join(SRC, 'actions/'),    // sample alias, calling require('actions/file') will resolve to ./src/actions/file.js
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: [/\.js$/,/\.jsx$/],
                exclude: /node_modules/,
                loader: 'babel',      // note that specifying 'babel' or 'babel-loader' is equivalent for Webpack
                query: {
                    presets: ['react', 'es2015'],
                    cacheDirectory: 'babel-cache'
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css', // Note that the order is important here, it means that 'style-loader' will be applied to the ouput of 'css-loader'
                include: styles
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url?limit=2",
                include: images
            },
            {
                test: /\.(ttf$|woff)$/,
                loader: "url",
                include: fonts
            },
            {   // Move a file (that has been required!)
                test: /\.tst$/,
                loader: "file?name=[path][name].[hash].[ext]"
            }
        ]
    },
    plugins: [
        definePlugin,
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']}),
        new CleanWebpackPlugin(['dist'], {root: __dirname})

    ],
    eslint: {
        configFile: '.eslintrc'
    },
    watchOptions: {
        poll: 500
    }
};

// if (process.env.PROD === '1') {
//     Buggy!!
//     config.module.loaders.push(stripLoader);
// };

if (process.env.PROD === '1') {
    console.log('Load image from a fictous CDN');
    //config.output.publicPath = 'http://cdn/'
    config.output.publicPath = '../webpack-tut/dist/'
}

module.exports = config;

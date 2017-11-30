/**
 * Created by Administrator on 2017-11-16.
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app : path.join(__dirname, 'app'),
    build : path.join(__dirname, 'build'),
    style : path.join(__dirname, 'app/main.css')
};
process.env.BABEL_ENV = TARGET;
const common = {
    entry : {
        app : PATHS.app + '/index.jsx',
        style : PATHS.style
    },
    resolve: {
        extensions: [ '.js', '.jsx']
    },
    output : {
        path : PATHS.build,
        filename: "[name].[hash].js",
        chunkFilename : '[hash].js'
    },
    module : {
        loaders : [
           /* {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            },*/
            {
                test: /\.jsx?$/,
                loader : 'babel-loader',
               /* query : {
                    cacheDirectory : true,
                    presets : [
                        'react',
                        'es2015'
                    ]
                },*/
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'Kanban app',
            appMountId: 'app',
            inject: false
        })
    ]
};
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool : 'eval-source-map',
        devServer : {
           /* contentBase : PATHS.build,*/
            historyApiFallback : true,
            hot : true,
            inline : true,
            progress : true,
            stats : 'errors-only',
            host : process.env.HOST,
            port : process.env.PORT
        },
        module : {
            loaders : [
                // Define development specific CSS setup
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                    include: PATHS.app
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({save : true})
        ]
    });
}
console.log('TARGET', TARGET);
if (TARGET === 'build' || TARGET === 'stats') {
    module.exports = merge(common, {
        // Define vendor entry point needed for splitting
        entry: {
            vendor: Object.keys(pkg.dependencies).filter(function(v) {
            // Exclude alt-utils as it won't work with this setup
            // due to the way the package has been designed
            // (no package.json main).
                return v !== 'alt-utils';
            })
        },
        module : {
            loaders : [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    }),
                    include: PATHS.app
                }
            ]
        },
        plugins : [
            new CleanPlugin([PATHS.build]),
            new ExtractTextPlugin('[name].[hash].css'),
            // Extract vendor and manifest files
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),

            // Setting DefinePlugin affects React library size!
            // DefinePlugin replaces content "as is" so we need some extra quotes
            // for the generated code to make sense
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            // You can set this to JSON.stringify('development') for your
            // development target to force NODE_ENV to development mode
            // no matter what
            }),

            new webpack.optimize.UglifyJsPlugin({
                compress : {
                    warnings : false
                },
                mangle : true,
                comments : false
            })
        ]
    });
}
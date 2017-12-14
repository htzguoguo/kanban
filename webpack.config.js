/**
 * Created by Administrator on 2017-11-16.
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
/*const NpmInstallPlugin = require('npm-install-webpack-plugin');
const path = require('path');*/

/*const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylelint = require('stylelint');*/

const common = require('./config/webpack.common');
const development = require('./config/webpack.developement');
const production = require('./config/webpack.production');
const test = require('./config/webpack.test');

/*const pkg = require('./package.json');*/
const TARGET = process.env.npm_lifecycle_event;

/*const PATHS = {
    app : path.join(__dirname, 'app'),
    build : path.join(__dirname, 'build'),
    style : path.join(__dirname, 'app/main.css'),
    test : path.join(__dirname, 'tests')
};*/
process.env.BABEL_ENV = TARGET;
/*const common = {
    entry : {
        app : PATHS.app + '/index.jsx',
        style : PATHS.style
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output : {
        path : PATHS.build,
        filename: "[name].[hash].js",
        chunkFilename : '[hash].js'
    },
    module : {
        rules : [
            {
                test: /\.(js|jsx)$/,
                loaders: ['eslint-loader'],
                enforce: 'pre',
                include: PATHS.app
            },
            {
                test: /\.css$/,
                loader: 'postcss-loader',
                enforce: 'pre',
                include: PATHS.app,
                options: {
                    plugins: () => ([
                        require('stylelint')({
                            ignoreFiles: 'node_modules/!**!/!*.css',
                        }),
                    ]),
                }
            },
            {
                test: /\.jsx?$/,
                loader : 'babel-loader',
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
};*/
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, development);

   /* module.exports = merge(common, {
        entry : {
            style : PATHS.style
        },
        devtool : 'eval-source-map',
        devServer : {
           /!* contentBase : PATHS.build,*!/
            historyApiFallback : true,

            hot : true,
            inline : true,
            progress : true,
            stats : 'errors-only',
            host : process.env.HOST,
            port : process.env.PORT
        },
        module : {
            rules : [
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
    });*/
}
if (TARGET === 'build' || TARGET === 'stats') {
    module.exports = merge(common, production);
   /* module.exports = merge(common, {
        // Define vendor entry point needed for splitting
        entry: {
            vendor: Object.keys(pkg.dependencies).filter(function(v) {
            // Exclude alt-utils as it won't work with this setup
            // due to the way the package has been designed
            // (no package.json main).
                return v !== 'alt-utils';
            }),
            style : PATHS.style
        },
        module : {
            rules : [
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
    });*/
}
if (TARGET === 'test' || TARGET === 'tdd') {
    module.exports = merge(common, test);
   /* module.exports = merge(common, {

        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loaders: ['isparta-instrumenter-loader'],
                    enforce: 'pre',
                    include: PATHS.app
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                    include: PATHS.app
                },
                {
                    test: /\.(js|jsx)$/,
                    loaders: ['babel-loader'],
                    include: PATHS.test
                }
            ]
        }
    });*/
}
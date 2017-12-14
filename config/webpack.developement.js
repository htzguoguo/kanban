/**
 * Created by Administrator on 2017-12-06.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const PATHS = require('./webpack.path');
const devServer = require('./parts/devserver');
const setupCSS = require('./parts/setupCSS');
const npmInstall = require('./parts/npmInstall');

const developement = merge(
    {
      /*  entry : {
            style : PATHS.style
        },*/
        devtool : 'eval-source-map',
    },
    setupCSS(PATHS.app),
    devServer({
        host : process.env.HOST,
        port : process.env.PORT
    }),
    npmInstall({
        save : true
    })
);

/*const developement = {
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
};*/

module.exports = developement;

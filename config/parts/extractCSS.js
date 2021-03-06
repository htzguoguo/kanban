/**
 * Created by Administrator on 2017-12-06.
 */
// Extract CSS during build
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function (paths) {
    return {
        module : {
            rules : [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    }),
                   /* include: paths*/
                }
            ]
        },
        plugins : [
            new ExtractTextPlugin('[name].[hash].css')
        ]
    };
};

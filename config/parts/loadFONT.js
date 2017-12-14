/**
 * Created by Administrator on 2017-12-11.
 */

module.exports = function () {
    return {
        module : {
            rules : [
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader'
                }
            ]
        }
    }
};

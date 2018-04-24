const path = require('path');
const ProgressBar = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

    entry: './src/index.js',
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, '../', 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ProgressBar(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'React slider',
            template: './src/index.html',
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'src/images/**/*', to: 'images/', flatten: true },
            { from: 'src/fonts/**/*', to: 'fonts/', flatten: true }
        ])
    ]
};

module.exports = config;

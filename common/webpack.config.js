const webpack = require('webpack');
const path = require('path');

const config = {
    mode: "production",
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'text-steganography-bundled.js',
        library: {
            name: "getConcealedText",
            type: "var" 
        },
    },
    resolve: {
        alias: {
            "buffer": "buffer"
        },
        fallback: {
            "assert": require.resolve("assert/"),
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib")
        }
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_DEBUG': "false",
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
};

module.exports = config;

const webpack = require('webpack');
const path = require('path');

const config = {
    mode: "production",
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'bundle.js'
    },
    resolve: {
        fallback: {
            "assert": require.resolve("assert/"),
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib")
        }
    },
};

module.exports = config;
const zlib = require('zlib');

module.exports = {

    getEncoded: (_config, text) => zlib.deflateSync(text).toString('base64'),

    getDecoded: (_config, text) => zlib.inflateSync(new Buffer.from(text, 'base64')).toString(),

};

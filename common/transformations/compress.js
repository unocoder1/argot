const zlib = require('zlib');


module.exports = {

    getEncoded: function(_config, text) {
        return zlib.deflateSync(text).toString('base64');
    },

    getDecoded: function(_config, text) {
        return  zlib.inflateSync(new Buffer.from(text, 'base64')).toString();
    }

};

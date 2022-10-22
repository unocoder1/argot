const accents = require('remove-accents');


module.exports = {

    getEncoded: function(_config, text) {
        return accents.removeAccents(text).replace(/[\u{0080}-\u{FFFF}]/gu,"");
    },

    getDecoded: function(_config, text) {
        return text;
    }

};

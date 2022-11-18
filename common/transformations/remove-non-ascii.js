const accents = require('remove-accents');

module.exports = {

    getEncoded: (_config, text) => accents.remove(text).replace(/[\u{0080}-\u{FFFF}]/gu, ''),

    getDecoded: (_config, text) => text,

};

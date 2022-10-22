const accents = require('remove-accents');


module.exports = {

    getEncoded: function(_config, text) {
        return accents.removeAccents(text);
    },

    getDecoded: function(_config, text) {
        return text;
    }

};

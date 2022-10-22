const accents = require('remove-accents');


exports.RemoveNonASCIIconst  = {

    getEncoded: (_config, originalText) => {
        return accents.removeAccents(originalText);
    },

    getDecoded: (_config, originalText) => {
        return originalText;
    }

};

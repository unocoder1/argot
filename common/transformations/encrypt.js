const crypto = require('crypto');

const algorithm = 'aes256';

module.exports = {

    getEncoded: (config, text) => {
        const cipher = crypto.createCipher(algorithm, config.password);
        return cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
    },

    getDecoded: (config, text) => {
        const decipher = crypto.createDecipher(algorithm, config.password);
        return decipher.update(text, 'base64', 'utf8') + decipher.final('utf8');
    },

};

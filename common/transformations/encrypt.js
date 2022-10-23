const crypto = require('crypto');


const algorithm = 'aes256';

module.exports = {

    getEncoded: (config, text) => {
        const cipher = crypto.createCipher(algorithm, config.password);
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    },

    getDecoded: (config, text) => {
        const decipher = crypto.createDecipher(algorithm, config.password);
        return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    }

};

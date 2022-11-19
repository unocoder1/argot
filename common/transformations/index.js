module.exports.RemoveNonASCII = require('./remove-non-ascii');
module.exports.Compress = require('./compress');
module.exports.Encrypt = require('./encrypt');
module.exports.NormalizeFrequencies = require('./normalize-frequencies');
module.exports.GenerateFakeText = require('./generate-fake-text');
module.exports.GenerateFakeText2 = require('./generate-fake-text-2');
module.exports.MapThroughDictionary = require('./map-through-dictionary');

module.exports.createTransformation = (config) => {
    const transformations = [];
    if (config.removeNonASCII === '1') { transformations.push(module.exports.RemoveNonASCII); }
    if (config.compressPlainText === '1') { transformations.push(module.exports.Compress); }
    // TODO: Assert if password is provided.
    if (config.encrypt === 'A') { transformations.push(module.exports.Encrypt); }
    if (config.normalizeFrequencies === '1') { transformations.push(module.exports.NormalizeFrequencies); }
    if (config.generateFakeText === 'A') { transformations.push(module.exports.GenerateFakeText2); }
    if (config.mapThroughDictionary === '1') { transformations.push(module.exports.MapThroughDictionary); }

    return {
        // eslint-disable-next-line no-shadow
        getEncoded: (config, text) => {
            let encodedText = text.slice();
            transformations.forEach((f) => { encodedText = f.getEncoded(config, encodedText); });
            return encodedText;
        },

        // eslint-disable-next-line no-shadow
        getDecoded: (config, text) => {
            let decodedText = text.slice();
            transformations.slice().reverse().forEach((f) => { decodedText = f.getDecoded(config, decodedText); });
            return decodedText;
        },
    };
};

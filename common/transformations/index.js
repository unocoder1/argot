module.exports.RemoveNonASCII = require('./remove-non-ascii');
module.exports.Compress = require('./compress');
module.exports.Encrypt = require('./encrypt');
module.exports.NormalizeFrequencies = require('./normalize-frequencies');
module.exports.GenerateFakeText = require('./generate-fake-text');
module.exports.GenerateFakeText2 = require('./generate-fake-text-2');
module.exports.MapThroughDictionary = require('./map-through-dictionary');

module.exports.createTransformation = (config) => {
    var transformations = [];
    if (config.removeNonASCII === true) { transformations.push(module.exports.RemoveNonASCII); }
    if (config.compressPlainText === true) { transformations.push(module.exports.Compress); }
    // TODO: Assert if password is provided.
    if (config.encrypt === true) { transformations.push(module.exports.Encrypt); }
    if (config.normalizeFrequencies === true) { transformations.push(module.exports.NormalizeFrequencies); }
    if (config.generateFakeText === true) { transformations.push(module.exports.GenerateFakeText2); }
    if (config.mapThroughDictionary === true) { transformations.push(module.exports.MapThroughDictionary); }

    return {
        getEncoded: (config, text) => {
            var encodedText = text.slice();
            transformations.forEach(f => encodedText = f.getEncoded(config, encodedText));
            return encodedText;
        },

        getDecoded: (config, text) => {
            var decodedText = text.slice();
            transformations.slice().reverse().forEach(f => decodedText = f.getDecoded(config, decodedText));
            return decodedText;
        }
    }
};

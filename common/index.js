const transformations = require('./transformations');

module.exports.getEncodedText = (config, originalText) => {
    if (config.debug === true) return 'debug';

    let concealedText = originalText.slice();

    const transformation = transformations.createTransformation(config);
    concealedText = transformation.getEncoded(config, originalText);

    return concealedText;
};

module.exports.getDecodedText = (config, originalText) => {
    if (config.debug === true) return 'debug';

    let concealedText = originalText.slice();

    const transformation = transformations.createTransformation(config);
    concealedText = transformation.getDecoded(config, originalText);

    return concealedText;
};

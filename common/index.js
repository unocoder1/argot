const transformations = require('./transformations');

module.exports.getEncodedText = function (config, originalText) {
	if (config.debug === true) return "debug";

	var concealedText = originalText.slice();

	const transformation = transformations.createTransformation(config);
	concealedText = transformation.getEncoded(config, originalText);

	return concealedText;
}

module.exports.getDecodedText = function (config, originalText) {
	if (config.debug === true) return "debug";

	var concealedText = originalText.slice();

	const transformation = transformations.createTransformation(config);
	concealedText = transformation.getDecoded(config, originalText);

	return concealedText;
}

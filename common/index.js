const transformations = require('./transformations');


module.exports = function getConcealedText(config, originalText) {
	if (config.debug === true) return "debug";

	var concealedText = originalText.slice();

	const transformation = transformations.createTransformation(config);
	concealedText = transformation.getEncoded(config, originalText);

	return concealedText;
}

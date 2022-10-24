const transformations = require('./transformations');


function getConcealedText(config, originalText) {
	if (config.debug === true) return "debug";

	var concealedText = originalText.slice();

	const transformation = transformations.createTransformation(config);
	const concealed = transformation.getEncoded(config, originalText);

	return concealedText;
}

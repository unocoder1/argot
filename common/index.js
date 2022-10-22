const tranformations = require('./transformations');


function getConcealedText(config, originalText) {
	if (config.debug === true) return "debug";

	var concealedText = originalText.slice();

	var concealedText = originalText.replace(/[\u{0080}-\u{FFFF}]/gu,"");

	return concealedText;
}


console.log(tranformations.RemoveNonASCII);
const asd = tranformations.Compress.getEncoded("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
console.log(asd);
console.log(tranformations.Compress.getEncoded(asd));

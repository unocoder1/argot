const transformations = require('./transformations');


function getConcealedText(config, originalText) {
	if (config.debug === true) return "debug";

	var concealedText = originalText.slice();

	var concealedText = originalText.replace(/[\u{0080}-\u{FFFF}]/gu,"");

	return concealedText;
}


console.log(transformations);
const asd = transformations.Encrypt.getEncoded({password: "asd"},"aaaaaaaaaaaaaaaaaaaaaaaaaaa");
console.log(asd);
console.log(transformations.Encrypt.getDecoded({password: "asd"}, asd));

const transformations = require('./transformations');


function getConcealedText(config, originalText) {
	if (config.debug === true) return "debug";

	var concealedText = originalText.slice();

	var concealedText = originalText.replace(/[\u{0080}-\u{FFFF}]/gu,"");

	return concealedText;
}


//console.log(transformations);
const asd = transformations.Encrypt.getEncoded({password: "asd"},"aaaaaaaaaaaaaaaaaaaaaaaaaaa");
//console.log(asd);
//console.log(transformations.Encrypt.getDecoded({password: "asd"}, asd));
const config = {password:"a", removeNonASCII:true, compressPlainText:true, encrypt:true};
const t = transformations.createTransformation(config);
const message = "Én vagyok a Betmenn !!%56";
console.log(message);
const concealed = t.getEncoded(config, message);
console.log(concealed);
console.log(t.getDecoded(config, concealed));
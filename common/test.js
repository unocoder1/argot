const transformations = require('./transformations');
const Dictionary = require('./transformations/generate-fake-text-2/dictionary.js');
const SentenceStructures = require('./transformations/generate-fake-text-2/sentence-structures.js');
const LanguageModel = require('./transformations/generate-fake-text-2/language-model.js');

function getConcealedText(config, originalText) {
    if (config.debug === true) return 'debug';

    var concealedText = originalText.slice();

    var concealedText = originalText.replace(/[\u{0080}-\u{FFFF}]/gu, '');

    return concealedText;
}

const config = {
    password: 'a',
    removeNonASCII: '1',
    compressPlainText: '1',
    encrypt: 'A',
    normalizeFrequencies: '1',
    generateFakeText: 'A',
    mapThroughDictionary: '0',
};
const t = transformations.createTransformation(config);
const message = 'Én vagyok a Betmenn !!%56';
console.log(message);
const concealed = t.getEncoded(config, message);
console.log(concealed);
console.log(t.getDecoded(config, concealed));

// const d = new Dictionary();
// d.AddAllAndSort();
// console.log(JSON.stringify(d));
// console.log(d.words.get("interjection"));
// console.log(SentenceStructures);
// const lm = new LanguageModel();
// console.log(lm.GenerateText("abcdearebrhaejheajerariitrhoirntioarhiarohoregegierigaerngneruakoitaetz!!!"));
// console.log(lm.DeGenerateText("And that   is. A very good idea. %!!"));

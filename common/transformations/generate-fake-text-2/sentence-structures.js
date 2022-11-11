const allSentenceStructures = [
    ["noun", "verb", "determiner", "adjective", "noun"],
    ["interjection"]
];

module.exports.sentenceStructures = [];

const longestSentence = allSentenceStructures.map(a => a.length).reduce((a,b) => a > b ? a : b);

for (let i = longestSentence; i > 0; i--) {
    module.exports.sentenceStructures[i] = allSentenceStructures.filter(a => a.length == i);
}

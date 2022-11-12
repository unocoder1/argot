const allSentenceStructures = [
    ["WT_noun", "WT_verb", "WT_determiner", "WT_adjective", "WT_noun"],
    ["WT_noun", "WT_linking_verb", "WT_adjective"],
    ["WT_interjection"]
];

module.exports = [];

const longestSentence = allSentenceStructures.map(a => a.length).reduce((a,b) => a > b ? a : b);

for (let i = longestSentence; i > 0; i--) {
    module.exports[i] = allSentenceStructures.filter(a => a.length == i);
}

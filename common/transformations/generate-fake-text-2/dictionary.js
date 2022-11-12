const lemmas_60k = require('./lemmas_60k.js');


function DictionaryEntry(word, frequency) {
    this.word = word;
    this.frequency = frequency;
}

function Dictionary() {
    this.alphabet = "abcdefghijklmnopqrstuvwxyz"; 

    this.types = ["WT_noun", "WT_verb", "WT_interjection", "WT_adverb", "WT_adjective", "WT_determiner"];
    this.typeMapping = new Map([
        ["n", "WT_noun"],
        ["v", "WT_verb"],
        ["u", "WT_interjection"],
        ["r", "WT_adverb"],
        ["j", "WT_adjective"],
        ["d", "WT_determiner"]
    ]);

    this.words = new Map();
    for (const type of this.types) {
        this.words.set(type, new Map())
        for (const letter of this.alphabet) {
            this.words.get(type).set(letter, []);
        }
    }

    this.SortAll = () => {
        for (const type of this.types) {
            for (let letter of this.alphabet) {
                this.words.get(type).get(letter).sort((a, b) => b.frequency - a.frequency);
            }
        }
    }

    this.AddLemmas60k = () => {
        for (const line of lemmas_60k.data) {
            const splittedLine = line.split('\t');
            if (this.typeMapping.has(splittedLine[1])) {
                const entry = new DictionaryEntry(splittedLine[0], parseInt(splittedLine[2]));
                this.words.get(this.typeMapping.get(splittedLine[1])).get(entry.word[0]).push(entry);
            }
        }
    }

    this.AddAllAndSort = () => {
        this.AddLemmas60k();
        this.SortAll();
    }
};

module.exports = Dictionary;
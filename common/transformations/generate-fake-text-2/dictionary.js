const lemmas_60k = require('./lemmas_60k.js');


const alphabet = "abcdefghijklmnopqrstuvwxyz";

function DictionaryEntry(word, type, frequency) {
    this.word = word;
    this.type = type;
    this.frequency = frequency;
}

function Dictionary() {
    this.noun = new Map();
    for (const letter of alphabet) {
        this.noun.set(letter, []);
    }

    this.verb = new Map();
    for (const letter of alphabet) {
        this.verb.set(letter, []);
    }

    this.interjection = new Map();
    for (const letter of alphabet) {
        this.interjection.set(letter, []);
    }

    this.adverb = new Map();
    for (const letter of alphabet) {
        this.adverb.set(letter, []);
    }

    this.adjective = new Map();
    for (const letter of alphabet) {
        this.adjective.set(letter, []);
    }

    this.SortAll = () => {
        for (let letter of alphabet) {
            this.noun.get(letter).sort((a, b) => b.frequency - a.frequency);
            this.verb.get(letter).sort((a, b) => b.frequency - a.frequency);
            this.interjection.get(letter).sort((a, b) => b.frequency - a.frequency);
            this.adverb.get(letter).sort((a, b) => b.frequency - a.frequency);
            this.adjective.get(letter).sort((a, b) => b.frequency - a.frequency);
        }
    }

    this.AddLemmas60k = () => {
        const typeMapping = new Map([
            ["n", "noun"],
            ["v", "verb"],
            ["u", "interjection"],
            ["r", "adverb"],
            ["j", "adjective"]
        ]);

        for (const line of lemmas_60k.data){
            const splittedLine = line.split('\t');
            if (typeMapping.has(splittedLine[1])) {
                const entry = new DictionaryEntry(splittedLine[0], typeMapping.get(splittedLine[1]), parseInt(splittedLine[2]));
                this[entry.type].get(entry.word[0]).push(entry);
            }
        }
    }

    this.AddAllAndSort = () => {
        this.AddLemmas60k();
        this.SortAll();
    }
};

module.exports = Dictionary;

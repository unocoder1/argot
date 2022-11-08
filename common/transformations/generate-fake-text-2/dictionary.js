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

    this.SortAll = () => {
        for (const letter of alphabet) {
            this.noun[letter].sort((a, b) => b.frequency - a.frequency);
            this.verb[letter].sort((a, b) => b.frequency - a.frequency);
        }
    }

    this.AddLemmas60k = () => {
        const typeMapping = new Map([
            ["n", "noun"],
            ["v", "verb"],
        ]);

        for (const line of lemmas_60k.data){
            const splittedLine = line.split('\t');
            if (splittedLine[1] in typeMapping) {
                const entry = new Entry(splittedLine[0], typeMapping[splittedLine[1]], parseInt(splittedLine[2]));
                this[entry.type][entry.word[0]].push(entry);
            }
        }
    }

    this.AddAllAndSort = () => {
        this.AddLemmas60k();
        this.SortAll();
    }
};

module.exports = Dictionary;

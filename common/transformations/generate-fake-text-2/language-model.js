const SentenceStructures = require('./sentence-structures.js');
const Dictionary = require('./dictionary.js');

function LanguageModel() {
    this.dictionary = new Dictionary ();
    this.dictionary.AddAllAndSort();

    this.TryGenerateSentence = (initials) => {
        const sentenceStructures = SentenceStructures[initials.length];
        const sentenceStructure = sentenceStructures[Math.floor(Math.random() * sentenceStructures.length)];
        let sentence = [];
        for (let i = 0; i < initials.length; i++) {
            // TODO: Handle fixed words.
            const words = this.dictionary.words.get(sentenceStructure[i]).get(initials[i]);
            if (words.length === 0) throw 'Cannot fill sentence structure';
            const word = words[Math.floor(Math.random() * words.length)].word;
            sentence.push(word);
        }
        return {sentence: sentence, metadata: sentenceStructure};
    }

    this.GetPostProcessedSentence = (sentenceWithMetadata) => {
        let postprocessedSentence = sentenceWithMetadata.sentence.join(" ");
        postprocessedSentence = postprocessedSentence[0].toUpperCase() + postprocessedSentence.substring(1);
        postprocessedSentence += ".";
        return postprocessedSentence;
    }

    this.GenerateText = (initials) => {
        let text = "";
        let cursor = 0;
        while (cursor < initials.length) {
            if (this.dictionary.alphabet.includes(initials[cursor]) === false) {
                if (cursor > 0 && this.dictionary.alphabet.includes(initials[cursor - 1])) {
                    text += " ";
                }
                text += initials[cursor];
                cursor++;
                continue;
            }
            let sentenceLength = 0;
            for (sentenceLength = SentenceStructures.length - 1; sentenceLength > 0; sentenceLength--) {
                if (cursor + sentenceLength > initials.length) continue;
                try {
                    const sentenceWithMetadata = this.TryGenerateSentence (initials.substring(cursor, cursor + sentenceLength));
                    if (text.length !== 0) text += " ";
                    text += this.GetPostProcessedSentence (sentenceWithMetadata);
                    cursor += sentenceLength;
                    break;
                } catch {
                    continue;
                }
            }
            if (sentenceLength === 0) {
                if (text.length !== 0) text += " ";
                text += initials[cursor].toUpperCase() + ".";
                cursor++;
            }
        }
        return text;
    }

    this.DeGenerateText = (text) => {
        return text
            .trim()
            .split(/\s+/)
            .map(t => this.dictionary.alphabet.includes(t[0].toLowerCase()) ? t[0].toLowerCase() : t)
            .join("");
    }
}

module.exports = LanguageModel;

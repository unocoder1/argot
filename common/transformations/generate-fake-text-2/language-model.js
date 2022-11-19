const SentenceStructures = require('./sentence-structures');
const Dictionary = require('./dictionary');

function LanguageModel() {
    this.dictionary = new Dictionary();
    this.dictionary.AddAllAndSort();

    this.TryGenerateSentence = (initials) => {
        const sentenceStructures = SentenceStructures[initials.length];
        const sentenceStructure = sentenceStructures[Math.floor(Math.random() * sentenceStructures.length)];
        const sentence = [];
        for (let i = 0; i < initials.length; i += 1) {
            // TODO: Handle fixed words.
            const words = this.dictionary.words.get(sentenceStructure[i]).get(initials[i]);
            if (words.length === 0) throw new Error('Cannot fill sentence structure');
            const { word } = words[Math.floor(Math.random() * words.length)];
            sentence.push(word);
        }
        return { sentence, metadata: sentenceStructure };
    };

    this.GetPostProcessedSentence = (sentenceWithMetadata) => {
        let postprocessedSentence = sentenceWithMetadata.sentence.join(' ');
        postprocessedSentence = postprocessedSentence[0].toUpperCase() + postprocessedSentence.substring(1);
        postprocessedSentence += '.';
        return postprocessedSentence;
    };

    this.GenerateText = (initials) => {
        let text = '';
        let cursor = 0;
        while (cursor < initials.length) {
            if (this.dictionary.alphabet.includes(initials[cursor]) === false) {
                if (cursor > 0 && this.dictionary.alphabet.includes(initials[cursor - 1])) {
                    text += ' ';
                }
                text += initials[cursor];
                cursor += 1;
                continue;
            }
            let sentenceLength = 0;
            for (sentenceLength = SentenceStructures.length - 1; sentenceLength > 0; sentenceLength -= 1) {
                if (cursor + sentenceLength > initials.length) continue;
                try {
                    const sentenceWithMetadata = this.TryGenerateSentence(initials.substring(cursor, cursor + sentenceLength));
                    if (text.length !== 0) text += ' ';
                    text += this.GetPostProcessedSentence(sentenceWithMetadata);
                    cursor += sentenceLength;
                    break;
                } catch {
                    continue;
                }
            }
            if (sentenceLength === 0) {
                if (text.length !== 0) text += ' ';
                text += `${initials[cursor].toUpperCase()}.`;
                cursor += 1;
            }
        }
        return text;
    };

    this.DeGenerateText = (text) => text
        .trim()
        .split(/\s+/)
        .filter((t) => t.length > 0)
        .map((t) => (this.dictionary.alphabet.includes(t[0].toLowerCase()) ? t[0].toLowerCase() : t))
        .join('');
}

module.exports = LanguageModel;

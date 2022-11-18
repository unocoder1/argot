const dictionary = {
    A: 'a',
    big: 'barack',
    cat: 'cérna',
    did: 'dereng',
    eat: 'egy',
    fairly: 'fa',
    great: 'gereblye',
    heaps: 'ha',
    in: 'is',
    Jordan: 'jó',
    Kitty: 'kell',
    limited: 'le',
    my: 'mert',
    network: 'nem',
    of: 'ont',
    people: 'pitypang',
    quality: 'qilyenbetunknincs',
    rare: 'rá',
    should: 'se',
    take: 'te',
    under: 'unom',
    very: 'vagy',
    way: 'Weöres',
    xenon: 'xilofon',
    you: 'Ybl',
    zebra: 'zöld',
};

const temp = {};
for (const key in dictionary) {
    const value = dictionary[key];
    temp[value] = key;
}
const dictionaryReverse = temp;

module.exports = {

    getEncoded: (_config, text) => {
        let encodedText = '';
        const words = text.trim().split(/\s+/);
        for (const w of words) {
            if (w in dictionary) {
                encodedText += dictionary[w];
            } else {
                encodedText += w;
            }
            encodedText += ' ';
        }
        return encodedText;
    },

    getDecoded: (_config, text) => {
        let decodedText = '';
        const words = text.trim().split(/\s+/);
        for (const w of words) {
            if (w in dictionaryReverse) {
                decodedText += dictionaryReverse[w];
            } else {
                decodedText += w;
            }
            decodedText += ' ';
        }
        return decodedText;
    },

};

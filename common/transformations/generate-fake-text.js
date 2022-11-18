const dictionary = {
    a: 'A',
    b: 'big',
    c: 'cat',
    d: 'did',
    e: 'eat',
    f: 'fairly',
    g: 'great',
    h: 'heaps',
    i: 'in',
    j: 'Jordan',
    k: 'Kitty',
    l: 'limited',
    m: 'my',
    n: 'network',
    o: 'of',
    p: 'people',
    q: 'quality',
    r: 'rare',
    s: 'should',
    t: 'take',
    u: 'under',
    v: 'very',
    w: 'way',
    x: 'xenon',
    y: 'you',
    z: 'zebra',
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
        for (const c of text) {
            if (c in dictionary) {
                encodedText += dictionary[c];
            } else {
                encodedText += c;
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
        }
        return decodedText;
    },

};
